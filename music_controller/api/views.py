from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, JoinRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response



# Create your views here.
class RoomView(generics.ListAPIView):
  queryset = Room.objects.all()
  serializer_class = RoomSerializer


class JoinRoom(APIView):
  serializer_class = JoinRoomSerializer

  def post(self, request, format=None):
    if not request.session.exists(self.request.session.session_key):
      request.session.create()

    serializer = self.serializer_class(data=request.data)
    print(serializer, 'serializer')
    print(serializer.is_valid(), 'is valid')


    if serializer.is_valid():
      code = serializer.data['code']
      print(code, 'code')
      queryset = Room.objects.filter(code=code)
      if queryset.exists() > 0:
        request.session['room_code'] = code
        return Response({'code': code}, status=status.HTTP_200_OK)

      return Response({'Room not found': 'invalid room code'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
class GetRoom(APIView):
  serializer_class = RoomSerializer
  lookup_url_kwarg = 'code'

  def get(self, request, format=None):
    code = request.GET.get(self.lookup_url_kwarg)
    if code != None:
      queryset = Room.objects.filter(code=code)
      if queryset.exists():
        data = RoomSerializer(queryset[0]).data
        data['is_host'] = self.request.session.session_key == data['host']
        return Response(data, status=status.HTTP_200_OK)
      else:
        return Response({'Room not found': 'invalid room code'}, status=status.HTTP_404_NOT_FOUND)
    return Response({'Bad request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class CreateRoom(APIView):
  serializer_class = CreateRoomSerializer

  def post(self, request, format=None):
    if not self.request.session.exists(self.request.session.session_key):
      self.request.session.create()

    serializer = self.serializer_class(data=request.data)
    print(serializer, 'serializer')
    print(serializer.is_valid(), 'is valid')    
    if serializer.is_valid():
      guest_can_pause = serializer.data['guest_can_pause']
      votes_to_skip = serializer.data['votes_to_skip']
      host = self.request.session.session_key
      queryset = Room.objects.filter(host=host)

      ## If exists just update votes_to_skip and guest_can_pause
      if queryset.exists():
        room = queryset[0]
        room.votes_to_skip = votes_to_skip
        room.guest_can_pause = guest_can_pause
        room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
        return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

      ## Create new Room
      else:
        room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
        room.save()
        return Response(status=status.HTTP_201_CREATED)

    return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)



