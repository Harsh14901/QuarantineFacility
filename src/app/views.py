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

import random
import names
from random_word.random_word import RandomWords


        

# Create your views here.
def index(request):
    """ Populating Groups and Persons  """
    # def make_people(num, address, group, isVip, isChild):
    #     if isChild:
    #         age_min = 1
    #         age_max = 17
    #     else:
    #         age_min = 18
    #         age_max = 95
    #     for i in range(num):
    #         p = Person(age=random.randint(age_min, age_max),
    #                 address=address, group=group, vip=isVip)
    #         p.name = names.get_full_name()
    #         p.risk = RiskChoices[random.randint(1, 1000) % 2][0]
    #         p.save()
    #         print(p)
    
    # for i in range(10):
    #     group = Group()
    #     group.category = Group.FAMILY if random.randint(1,1000)%2==0 else Group.ADULTS
    #     group.count = random.randint(2,6)
    #     group.facility_preference = Facility.objects.get(id=random.randint(3,11))
    #     group.save()
    #     print(group)

    #     r = RandomWords()
    #     isVip = bool(random.randint(1, 1000) % 2)
    #     try:
    #         address = ', '.join(r.get_random_words()[:3])
    #     except:
    #         address = "Some unknown address"
        
            
        
    #     if group.category == Group.FAMILY:
    #         make_people(2,address,group,isVip,True)
    #         make_people(group.count - 2,address,group,isVip,False)
    #     else:
    #         make_people(group.count, address, group, isVip, False)

            
    groups = Group.objects.all()
    # a = get_sorted_list(groups)
    # b=[]
    # for per in a:
    #     b.append(f"{per.name} | {per.age} | {per.group.category} | {per.risk} | {per.vip}")
    # resp = "<br/>".join(b)

    resp = ""
    result = allocate(groups)
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
