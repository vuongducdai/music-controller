from django.urls import path
from .views import RoomView, CreateRoom, GetRoom, JoinRoom, UserInRoom, LeaveRoom

urlpatterns = [
    path('all', RoomView.as_view()),
    path('create', CreateRoom.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
]