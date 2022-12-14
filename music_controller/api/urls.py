from django.urls import path
from .views import RoomView, CreateRoom

urlpatterns = [
    path('all', RoomView.as_view()),
    path('create', CreateRoom.as_view())
]