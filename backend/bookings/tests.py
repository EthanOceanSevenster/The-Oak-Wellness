import json
from datetime import timedelta

from django.core import mail
from django.test import TestCase, override_settings
from django.urls import reverse
from django.utils import timezone

from .models import BookingRequest


@override_settings(BOOKING_NOTIFY_EMAIL='practice@example.com')
class CreateBookingTests(TestCase):
    def post(self, **overrides):
        data = {
            'name': 'Thandi Mokoena',
            'email': 'thandi@example.com',
            'phone': '082 123 4567',
            'service': 'families',
            'preferred_date': (timezone.localdate() + timedelta(days=3)).isoformat(),
            'preferred_time': 'morning',
            'contact_method': 'email',
            'message': 'Looking for parenting support.',
            'consent': True,
            **overrides,
        }
        return self.client.post(
            reverse('create-booking'), json.dumps(data), content_type='application/json'
        )

    def test_saves_booking_and_notifies_practice(self):
        response = self.post()

        self.assertEqual(response.status_code, 201)
        booking = BookingRequest.objects.get(pk=response.json()['id'])
        self.assertEqual(booking.name, 'Thandi Mokoena')
        self.assertEqual(booking.service_label, 'Parents and Families')
        self.assertEqual(booking.status, BookingRequest.Status.NEW)

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, ['practice@example.com'])
        self.assertIn('Parents and Families', mail.outbox[0].body)
        self.assertIn('Contact by: Email', mail.outbox[0].body)

    def test_date_is_optional(self):
        response = self.post(preferred_date=None)

        self.assertEqual(response.status_code, 201)

    def test_reports_missing_fields(self):
        response = self.post(name='', email='', phone='', service='')

        self.assertEqual(response.status_code, 400)
        errors = response.json()['errors']
        self.assertEqual(set(errors), {'name', 'email', 'phone', 'service'})
        self.assertEqual(errors['name'], ['Please enter your name.'])
        self.assertFalse(BookingRequest.objects.exists())

    def test_rejects_unknown_service(self):
        response = self.post(service='astrology')

        self.assertEqual(response.status_code, 400)
        self.assertIn('service', response.json()['errors'])

    def test_rejects_dates_in_the_past(self):
        yesterday = timezone.localdate() - timedelta(days=1)
        response = self.post(preferred_date=yesterday.isoformat())

        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.json()['errors']['preferred_date'],
            ['Please choose a date from today onwards.'],
        )

    def test_rejects_invalid_phone_number(self):
        response = self.post(phone='123')

        self.assertEqual(response.status_code, 400)
        self.assertIn('phone', response.json()['errors'])

    def test_requires_consent(self):
        response = self.post(consent=False)

        self.assertEqual(response.status_code, 400)
        self.assertIn('consent', response.json()['errors'])

    def test_honeypot_submissions_are_not_saved(self):
        response = self.post(website='http://spam.example')

        self.assertEqual(response.status_code, 201)
        self.assertFalse(BookingRequest.objects.exists())
        self.assertEqual(len(mail.outbox), 0)

    def test_rejects_malformed_json(self):
        response = self.client.post(
            reverse('create-booking'), 'not json', content_type='application/json'
        )

        self.assertEqual(response.status_code, 400)

    def test_rejects_get(self):
        response = self.client.get(reverse('create-booking'))

        self.assertEqual(response.status_code, 405)


class BookingOptionsTests(TestCase):
    def test_lists_form_options(self):
        response = self.client.get(reverse('booking-options'))

        self.assertEqual(response.status_code, 200)
        data = response.json()
        services = [option['value'] for option in data['services']]
        self.assertIn('children', services)
        self.assertEqual(services[-1], 'unsure')
        self.assertEqual(
            [option['value'] for option in data['contact_methods']],
            ['phone', 'email'],
        )
