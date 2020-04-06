from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import HttpResponse
from rest_framework.viewsets import *
from .models import *
from .serializers import *
from rest_framework import mixins
from rest_framework import generics

# import random,names
# from random_word import RandomWords


# Create your views here.
def index(request):
    """ Populating database """
    # Populating facilities
    # word = RandomWords()
    # for i in range(10):
    #     f = Facility()
    #     f.name = f"{word.get_random_word()} Facility"
    #     f.owner = names.get_full_name()
    #     f.address = f"Some place we cannot reach {random.randint(5000,10000)}"
    #     w1, w2 = Ward(category=Ward.WARD1), Ward(category=Ward.WARD2)
    #     rc1,rc2 = random.randint(1,10), random.randint(1, 10)
    #     w1.room_count,w2.room_count = rc1,rc2
    #     f.room_count = rc1+rc2
    #     f.save()
    #     print(f)
    #     w1.facility,w2.facility = f,f
    #     w1.save()
    #     w2.save()
    #     print(w1,w2)
    #     for i in range(rc1):
    #         r = Room()
    #         r.category = Room.RoomChoices[random.randint(0,3)][0]
    #         r.floor = random.randint(1,9)
    #         r.room_num = 100*r.floor + random.randint(1,90)
    #         r.area = 100*random.random()
    #         r.ward = w1
    #         r.capacity = random.randint(1,4)
    #         r.save()
    #         print(r)

    #     for i in range(rc2):
    #         r = Room()
    #         r.category = Room.RoomChoices[random.randint(0, 3)][0]
    #         r.floor = random.randint(1, 9)
    #         r.room_num = 100*r.floor + random.randint(1, 90)
    #         r.area = 100*random.random()
    #         r.ward = w2
    #         r.capacity = random.randint(1, 4)
    #         r.save()
    #         print(r)

    # Populating Room types
    # for i in range(4):
    #     for i in range(2):
    #         r = Room(category=Room.RoomChoices[i][0])
    #         r.room_num = random.randint(100,700)
    #         r.floor = r.room_num // 100
    #         r.area = 100*random.random()
    #         r.capacity = 2 if i%2 ==0 else 3
    return HttpResponse("<h1> Hi </h1>")

class FacilityViewSet(ModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer

class WardViewSet(ModelViewSet):
    queryset = Ward.objects.all()
    serializer_class = WardSerializer

class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class PersonViewSet(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class LuxuryViewSet(ModelViewSet):
    queryset = Luxury.objects.all()
    serializer_class = LuxurySerializer


class PersonAccomodationViewSet(ReadOnlyModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonAccomodationSerializer
