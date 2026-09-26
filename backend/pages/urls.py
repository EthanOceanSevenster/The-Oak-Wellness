from django.urls import path

from . import views

urlpatterns = [
    path('content/', views.site_content, name='site-content'),
]
