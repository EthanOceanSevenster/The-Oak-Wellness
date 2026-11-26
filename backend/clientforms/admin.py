from django.contrib import admin
from django.utils.html import format_html

from .definitions import FORM_CHOICES
from .models import FormSubmission


class FormFilter(admin.SimpleListFilter):
    title = 'form'
    parameter_name = 'form'

    def lookups(self, request, model_admin):
        return FORM_CHOICES

    def queryset(self, request, queryset):
        return queryset.filter(form=self.value()) if self.value() else queryset


@admin.register(FormSubmission)
class FormSubmissionAdmin(admin.ModelAdmin):
    list_display = ['form_name', 'person', 'score', 'status', 'created_at']
    list_editable = ['status']
    list_filter = [FormFilter, 'status']
    search_fields = ['name', 'summary']
    date_hierarchy = 'created_at'
    fields = ['form_name', 'name', 'score', 'status', 'created_at', 'answers_text']
    readonly_fields = ['form_name', 'name', 'score', 'created_at', 'answers_text']

    def has_add_permission(self, request):
        return False

    @admin.display(description='Form', ordering='form')
    def form_name(self, submission):
        return submission.form_title

    @admin.display(description='Name', ordering='name')
    def person(self, submission):
        return submission.name or 'Anonymous'

    @admin.display(description='Answers')
    def answers_text(self, submission):
        return format_html(
            '<pre style="white-space: pre-wrap; font: inherit">{}</pre>', submission.summary
        )
