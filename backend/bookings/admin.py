from django.contrib import admin

from .models import BookingRequest


@admin.register(BookingRequest)
class BookingRequestAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'session_for',
        'preferred_date',
        'preferred_time',
        'contact_method',
        'phone',
        'status',
        'created_at',
    ]
    list_editable = ['status']
    list_filter = ['status', 'service', 'contact_method']
    search_fields = ['name', 'email', 'phone']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'

    @admin.display(description='Session for', ordering='service')
    def session_for(self, booking):
        return booking.service_label
