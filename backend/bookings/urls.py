from django.urls import path

from . import views

urlpatterns = [
    path('', views.create_booking, name='create-booking'),
    path('options/', views.booking_options, name='booking-options'),
]
