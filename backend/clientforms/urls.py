from django.urls import path

from . import views

urlpatterns = [
    path('', views.form_list, name='form-list'),
    path('<slug:slug>/', views.form_detail, name='form-detail'),
]
