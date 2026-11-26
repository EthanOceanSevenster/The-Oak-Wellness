import json
import logging
from urllib.parse import quote

from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_http_methods

from pages.content import SITE_CONTENT

from .definitions import FORMS, FORMS_BY_SLUG
from .models import FormSubmission
from .validation import clean, score, summary_lines

logger = logging.getLogger(__name__)

# wa.me links carry the message in the URL; keep it well within what phones
# and browsers accept. The full answers are always saved in the admin.
WHATSAPP_MAX_CHARS = 3000

LIST_KEYS = ['slug', 'title', 'audience', 'summary', 'pdf']


@require_GET
def form_list(request):
    return JsonResponse({'forms': [{key: form[key] for key in LIST_KEYS} for form in FORMS]})


# POSTs come server-to-server from the Next.js server action, so there is no
# browser session or CSRF cookie to check.
@csrf_exempt
@require_http_methods(['GET', 'POST'])
def form_detail(request, slug):
    form = FORMS_BY_SLUG.get(slug)
    if form is None:
        return JsonResponse({'error': 'Not found'}, status=404)
    if request.method == 'GET':
        return JsonResponse(form)
    return _submit(request, form)


def _submit(request, form):
    try:
        data = json.loads(request.body)
    except ValueError:
        data = None
    if not isinstance(data, dict) or not isinstance(data.get('answers'), dict):
        return JsonResponse({'errors': {'__all__': ['Invalid request.']}}, status=400)

    # Honeypot: people never see the "website" field, but spam bots fill it in.
    if data.get('website'):
        return JsonResponse({'id': None, 'whatsapp_url': None, 'score': None}, status=201)

    answers, errors = clean(form, data['answers'])
    if errors:
        return JsonResponse({'errors': errors}, status=400)

    result = score(form, answers)
    name_field = form.get('name_field')
    submission = FormSubmission.objects.create(
        form=form['slug'],
        name=answers.get(name_field, '') if name_field else '',
        answers=answers,
        summary='\n'.join(summary_lines(form, answers)),
        score=result['total'] if result else None,
    )
    if result:
        submission.summary += f'\n\nScore: {result["total"]} / {result["max"]}'
        submission.save(update_fields=['summary'])

    message = _message(form, submission)
    _notify_practice(form, submission, message)
    return JsonResponse(
        {
            'id': submission.pk,
            'whatsapp_url': _whatsapp_url(message),
            'score': result if result and form['score'].get('show_client') else None,
        },
        status=201,
    )


def _message(form, submission):
    submitted = timezone.localtime(submission.created_at).strftime('%d %B %Y, %H:%M')
    header = '\n'.join([
        f'*{form["title"]}*',
        f'From: {submission.name or "Anonymous"}',
        f'Submitted: {submitted}',
        f'Reference: #{submission.pk}',
        '',
    ])
    body = submission.summary
    if len(header) + len(body) > WHATSAPP_MAX_CHARS:
        body = (
            body[: WHATSAPP_MAX_CHARS - len(header) - 80].rstrip()
            + f'\n…\n(Full answers saved on the website, reference #{submission.pk}.)'
        )
    return header + '\n' + body


def _whatsapp_url(message):
    base = SITE_CONTENT['contact']['whatsapp_href']
    return f'{base}?text={quote(message)}'


def _notify_practice(form, submission, message):
    try:
        send_mail(
            f'New {form["title"]}: {submission.name or "Anonymous"}',
            message.replace('*', ''),
            None,
            [settings.BOOKING_NOTIFY_EMAIL],
        )
    except Exception:
        # Already saved and visible in the admin, so don't fail the submission.
        logger.exception('Could not send notification for form submission %s', submission.pk)
