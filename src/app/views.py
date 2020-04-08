from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import HttpResponse
from rest_framework.viewsets import *
from .models import *
from .serializers import *

from django.http import JsonResponse
from rest_framework import status

from rest_framework import mixins
from rest_framework import generics

from .algo import *

import random
import names
# from random_word.random_word import RandomWords


        

# Create your views here.
def index(request):  
    print('important')          
    groups = Group.objects.all()
    tbd=[]
    for group in groups:
        if len(list(group.person_set.all()))==0:
            tbd.append(group.id)
    for i in tbd:
        print(group)
        Group.objects.get(id=i).delete()
    groups = Group.objects.all()
    # a = get_sorted_list(groups)
    # b=[]
    # for per in a:
    #     b.append(f"{per.name} | {per.age} | {per.group.category} | {per.risk} | {per.vip}")
    # resp = "<br/>".join(b)

    resp = ""
    result = allocate(groups)
    print(result)
    if result is not None:
        resp = "<h1>Failed for</h1>"
        b = []
        for per in result:
            b.append(f"{per.name} | {per.age} | {per.group.category} | {per.risk} | {per.vip}")
        resp += "<br/>".join(b)
    
    resp += "<h1> Succesfully allocated rooms </h1>"
    b = []
    for group in groups:
        for per in group.person_set.all():
            if per.room is not None:
                b.append(f"{per.name} | {per.age} | {per.group.category} | {per.risk} | {per.vip} | <b> {per.room} </b>")
    resp += "<br/>".join(b)

    return HttpResponse(str(resp))
    
    


def searchPerson(request):
    queryDict = request.GET

    address = queryDict.get('address',default='')
    name = queryDict.get('name',default='')
    
    queryset = Person.objects.filter(address__icontains=address,name__icontains=name)
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
        facilitySet = []
        try:
            person = Person.objects.get(id=uid)
            facilitySet = [person.room.ward.facility]
        except :
            # return HttpResponse('user does not exist', status=status.HTTP_400_BAD_REQUEST)
            pass   
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


class PersonAccomodationViewSet(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonAccomodationSerializer

class MedicineViewSet(ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

class CheckupViewSet(ModelViewSet):
    queryset = CheckupRecords.objects.all()
    serializer_class = CheckupSerializer
