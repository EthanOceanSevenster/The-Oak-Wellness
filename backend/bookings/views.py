import json
import logging

from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .choices import SERVICE_CHOICES
from .forms import BookingRequestForm
from .models import BookingRequest

logger = logging.getLogger(__name__)


def _options(choices):
    return [{'value': value, 'label': label} for value, label in choices]


@require_GET
def booking_options(request):
    return JsonResponse({
        'services': _options(SERVICE_CHOICES),
        'preferred_times': _options(BookingRequest.PreferredTime.choices),
        'contact_methods': _options(BookingRequest.ContactMethod.choices),
    })


# Called server-to-server by the Next.js booking form's server action, so
# there is no browser session or CSRF cookie to check.
@csrf_exempt
@require_POST
def create_booking(request):
    try:
        data = json.loads(request.body)
    except ValueError:
        data = None
    if not isinstance(data, dict):
        return JsonResponse({'errors': {'__all__': ['Invalid request.']}}, status=400)

    # Honeypot: people never see the "website" field, but spam bots fill it in.
    # Pretend it worked so they don't try again.
    if data.get('website'):
        return JsonResponse({}, status=201)

    form = BookingRequestForm(data)
    if not form.is_valid():
        errors = {field: list(messages) for field, messages in form.errors.items()}
        return JsonResponse({'errors': errors}, status=400)

    booking = form.save()
    _notify_practice(booking)
    return JsonResponse({'id': booking.pk}, status=201)


def _notify_practice(booking):
    date = booking.preferred_date.strftime('%A %d %B %Y') if booking.preferred_date else 'No preference'
    body = '\n'.join([
        f'New booking request from {booking.name}',
        '',
        f'Session for: {booking.service_label}',
        f'Preferred date: {date}',
        f'Preferred time: {booking.get_preferred_time_display()}',
        f'Contact by: {booking.get_contact_method_display()}',
        '',
        f'Phone: {booking.phone}',
        f'Email: {booking.email}',
        '',
        'Message:',
        booking.message or '(none)',
    ])
    try:
        send_mail(
            f'New booking request: {booking.name}',
            body,
            None,
            [settings.BOOKING_NOTIFY_EMAIL],
        )
    except Exception:
        # The request is already saved and visible in the admin, so don't fail it.
        logger.exception('Could not send booking notification for booking %s', booking.pk)
