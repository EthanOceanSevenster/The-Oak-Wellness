from django.db import models

from .choices import SERVICE_LABELS


class BookingRequest(models.Model):
    """A request for a session, sent from the website's booking form."""

    class PreferredTime(models.TextChoices):
        MORNING = 'morning', 'Morning'
        AFTERNOON = 'afternoon', 'Afternoon'
        ANY = 'any', 'Any time'

    class ContactMethod(models.TextChoices):
        PHONE = 'phone', 'Phone call'
        EMAIL = 'email', 'Email'

    class Status(models.TextChoices):
        NEW = 'new', 'New'
        CONTACTED = 'contacted', 'Contacted'
        CONFIRMED = 'confirmed', 'Confirmed'
        CLOSED = 'closed', 'Closed'

    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    # Validated against SERVICE_CHOICES in the form, so editing the services on
    # the site doesn't need a migration.
    service = models.CharField(max_length=40)
    preferred_date = models.DateField(null=True, blank=True)
    preferred_time = models.CharField(
        max_length=20, choices=PreferredTime.choices, default=PreferredTime.ANY
    )
    contact_method = models.CharField(
        max_length=20, choices=ContactMethod.choices, default=ContactMethod.PHONE
    )
    message = models.TextField(max_length=1000, blank=True)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.NEW
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} – {self.service_label}'

    @property
    def service_label(self):
        return SERVICE_LABELS.get(self.service, self.service)
