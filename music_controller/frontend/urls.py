from django.contrib import admin
from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('home', index),
    path('home/create', index),
    path('home/join', index),
]