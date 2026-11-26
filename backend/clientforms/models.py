from django.db import models

from .definitions import FORMS_BY_SLUG


class FormSubmission(models.Model):
    """A completed form (consent, questionnaire or evaluation) from the website."""

    class Status(models.TextChoices):
        NEW = 'new', 'New'
        REVIEWED = 'reviewed', 'Reviewed'

    # The form's slug from definitions.py. Not a choices field, so adding or
    # renaming forms doesn't need a migration.
    form = models.CharField(max_length=40)
    name = models.CharField(max_length=200, blank=True)
    answers = models.JSONField()
    summary = models.TextField()
    score = models.PositiveSmallIntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.form_title} – {self.name or "Anonymous"}'

    @property
    def form_title(self):
        form = FORMS_BY_SLUG.get(self.form)
        return form['title'] if form else self.form
