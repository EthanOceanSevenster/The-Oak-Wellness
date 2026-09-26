import re

from django import forms
from django.utils import timezone

from .choices import SERVICE_CHOICES
from .models import BookingRequest


class BookingRequestForm(forms.ModelForm):
    service = forms.ChoiceField(
        choices=SERVICE_CHOICES,
        error_messages={'required': 'Please choose who the session is for.'},
    )
    consent = forms.BooleanField(
        error_messages={
            'required': 'Please agree so that we can contact you about your booking.'
        },
    )

    class Meta:
        model = BookingRequest
        fields = [
            'name',
            'email',
            'phone',
            'service',
            'preferred_date',
            'preferred_time',
            'contact_method',
            'message',
        ]
        error_messages = {
            'name': {'required': 'Please enter your name.'},
            'email': {
                'required': 'Please enter your email address.',
                'invalid': 'Please enter a valid email address.',
            },
            'phone': {'required': 'Please enter your phone number.'},
            'preferred_date': {'invalid': 'Please enter a valid date.'},
        }

    def clean_phone(self):
        phone = self.cleaned_data['phone'].strip()
        digits = re.sub(r'\D', '', phone)
        if not 9 <= len(digits) <= 15:
            raise forms.ValidationError('Please enter a valid phone number.')
        return phone

    def clean_preferred_date(self):
        date = self.cleaned_data.get('preferred_date')
        if date and date < timezone.localdate():
            raise forms.ValidationError('Please choose a date from today onwards.')
        return date
