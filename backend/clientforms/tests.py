import json
from urllib.parse import unquote

from django.core import mail
from django.test import TestCase, override_settings
from django.urls import reverse

from .definitions import FORMS, fields
from .models import FormSubmission

CONSENT = {
    'full_name': ['Thandi Mokoena'],
    'date_of_birth': ['1990-04-12'],
    'phone': ['082 123 4567'],
    'email': ['thandi@example.com'],
    'emergency_name': ['Sipho Mokoena'],
    'emergency_phone': ['083 765 4321'],
    'method': ['Online'],
    'consent': ['on'],
    'signature': ['Thandi Mokoena'],
}


def stress_answers(value='3'):
    return {
        'name': ['Lerato'],
        **{f'habits.{i}': [value] for i in range(15)},
        'reflection': ['Sleep earlier'],
    }


@override_settings(BOOKING_NOTIFY_EMAIL='practice@example.com')
class SubmitFormTests(TestCase):
    def post(self, slug, answers, **extra):
        return self.client.post(
            reverse('form-detail', args=[slug]),
            json.dumps({'answers': answers, **extra}),
            content_type='application/json',
        )

    def test_consent_is_saved_and_sent_to_whatsapp(self):
        response = self.post('consent', CONSENT)

        self.assertEqual(response.status_code, 201)
        submission = FormSubmission.objects.get(pk=response.json()['id'])
        self.assertEqual(submission.name, 'Thandi Mokoena')
        self.assertIn('Consent given: Yes', submission.summary)
        self.assertIn('Date of birth: 12 April 1990', submission.summary)

        url = response.json()['whatsapp_url']
        self.assertTrue(url.startswith('https://wa.me/27658695856?text='))
        text = unquote(url.split('?text=', 1)[1])
        self.assertIn('*Informed Consent for Counselling*', text)
        self.assertIn('Preferred counselling method: Online', text)

        self.assertEqual(mail.outbox[0].to, ['practice@example.com'])

    def test_consent_must_be_given(self):
        response = self.post('consent', {**CONSENT, 'consent': []})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.json()['errors']), {'consent'})
        self.assertFalse(FormSubmission.objects.exists())

    def test_reports_missing_and_invalid_fields(self):
        response = self.post(
            'consent',
            {**CONSENT, 'full_name': [''], 'email': ['nope'], 'phone': ['12'],
             'date_of_birth': ['2999-01-01'], 'method': ['Carrier pigeon']},
        )

        errors = response.json()['errors']
        self.assertEqual(
            set(errors), {'full_name', 'email', 'phone', 'date_of_birth', 'method'}
        )
        self.assertEqual(errors['full_name'], ['Please fill in this field.'])

    def test_stress_questionnaire_scores_for_the_client(self):
        response = self.post('stress-questionnaire', stress_answers('3'))

        self.assertEqual(response.status_code, 201)
        result = response.json()['score']
        self.assertEqual(result['total'], 45)
        self.assertEqual(result['max'], 60)
        self.assertTrue(result['band'].startswith('You report many helpful'))
        self.assertEqual(FormSubmission.objects.get().score, 45)

    def test_scale_needs_every_statement(self):
        answers = stress_answers()
        del answers['habits.7']

        response = self.post('stress-questionnaire', answers)

        self.assertEqual(
            response.json()['errors'], {'habits': ['Please answer every statement.']}
        )

    def test_wellness_check_in_score_is_kept_from_the_client(self):
        answers = {
            'company': ['Acme'],
            **{f'wellbeing.{i}': ['4'] for i in range(10)},
            'challenges': ['Work-related stress', 'Grief and loss'],
            'challenges.other': ['Commute'],
            'feeling': ['Fair'],
            'follow_up': ['Yes'],
            'urgent': ['No'],
        }

        response = self.post('wellness-check-in', answers)

        self.assertEqual(response.status_code, 201)
        self.assertIsNone(response.json()['score'])
        submission = FormSubmission.objects.get()
        self.assertEqual(submission.score, 40)
        self.assertIn(
            'Current challenges: Work-related stress, Grief and loss, Other: Commute',
            submission.summary,
        )

    def test_rejects_options_not_on_the_form(self):
        response = self.post(
            'counselling-evaluation',
            {**{f'satisfaction.{i}': ['5'] for i in range(10)}, 'wellbeing': ['Great'],
             'more_sessions': ['Yes'], 'recommend': ['Yes']},
        )

        self.assertEqual(set(response.json()['errors']), {'wellbeing'})

    def test_long_answers_are_trimmed_for_whatsapp_but_kept_in_full(self):
        answers = {
            **{f'evaluation.{i}': ['4'] for i in range(10)},
            'rating': ['Good'],
            'most_valuable': ['x' * 2000],
            'improvements': ['y' * 2000],
            'another_programme': ['Yes'],
            'counselling': ['No'],
        }

        response = self.post('programme-evaluation', answers)

        text = unquote(response.json()['whatsapp_url'].split('?text=', 1)[1])
        self.assertLessEqual(len(text), 3000)
        self.assertIn('Full answers saved on the website', text)
        self.assertIn('y' * 2000, FormSubmission.objects.get().summary)

    def test_honeypot_submissions_are_not_saved(self):
        response = self.post('consent', CONSENT, website='http://spam.example')

        self.assertEqual(response.status_code, 201)
        self.assertFalse(FormSubmission.objects.exists())
        self.assertEqual(len(mail.outbox), 0)

    def test_unknown_form(self):
        self.assertEqual(self.post('tax-return', {}).status_code, 404)

    def test_rejects_malformed_json(self):
        response = self.client.post(
            reverse('form-detail', args=['consent']), 'nope', content_type='application/json'
        )

        self.assertEqual(response.status_code, 400)


class FormDefinitionTests(TestCase):
    def test_lists_every_form(self):
        data = self.client.get(reverse('form-list')).json()['forms']

        self.assertEqual([form['slug'] for form in data], [form['slug'] for form in FORMS])
        self.assertTrue(all(form['pdf'].endswith('.pdf') for form in data))

    def test_returns_a_form_definition(self):
        data = self.client.get(reverse('form-detail', args=['consent'])).json()

        self.assertEqual(data['title'], 'Informed Consent for Counselling')
        self.assertTrue(data['sections'])

    def test_field_names_are_unique_within_each_form(self):
        for form in FORMS:
            names = [field['name'] for field in fields(form)]
            self.assertEqual(len(names), len(set(names)), form['slug'])
