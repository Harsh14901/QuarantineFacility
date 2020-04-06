from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import HttpResponse
from rest_framework.viewsets import *
from .models import *
from .serializers import *
import app.serializers as jsonifier
from django.http import JsonResponse

from django.core import serializers
from rest_framework.renderers import JSONRenderer



# Create your views here.
def index(request):
       return HttpResponse("<h1> Hi </h1>")


def searchPerson(request):
    queryDict = request.GET

    location = queryDict.get('location',default='')
    name = queryDict.get('name',default='')
    
    queryset = Person.objects.filter(address__icontains=location,name__icontains=name)
    return JsonResponse(PersonSerializer(queryset,many=True).data,safe=False)

def searchFacility(request):
    queryDict = request.GET

    location = queryDict.get('location',default='')
    name = queryDict.get('name',default='')
    occupancy_lb = int(queryDict.get('occupancy_lb',default=0))
    occupancy_ub = int(queryDict.get('occupancy_ub',default=1000000000))

    capacity_lb = int(queryDict.get('capacity_lb',default=0))
    capacity_ub = int(queryDict.get('capacity_ub',default=1000000000))

    uid = queryDict.get('uid',default=None)

    facilitySet = Facility.objects.filter(name__icontains=name)
    facilitySet = list(filter(lambda obj: capacity_lb <= obj.capacity <= capacity_ub,list(facilitySet)))
    facilitySet = list(filter(lambda obj: occupancy_lb <= obj.occupancy_count <= occupancy_ub,list(facilitySet)))
    if uid:
        person = Person.objects.get(id=uid)
        facilitySet = [person.room.ward.facility]
    
    return JsonResponse(FacilitySerializer(facilitySet,many=True).data,safe=False)



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
