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

def isCityAdmin(user):
    return len(user.city_set.all()) != 0

def isFacilityAdmin(user):
    return len(user.facility_set.all()) != 0


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


class CityViewSet(ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

class FacilityViewSet(ModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer

    def get_queryset(self):
        queryset = Facility.objects.none()
        user = self.request._user
        if(isCityAdmin(user)):
            queryset = Facility.objects.all().filter(city__admin=user)
        elif(isFacilityAdmin(user)):
            queryset = Facility.objects.all().filter(admin=user)
        return queryset
        
    

class WardViewSet(ModelViewSet):
    queryset = Ward.objects.all()
    serializer_class = WardSerializer
    
    def get_queryset(self):
        queryset = Ward.objects.none()
        user = self.request._user
        if(isCityAdmin(user)):
            queryset = Ward.objects.all().filter(facility__city__admin=user)
        elif(isFacilityAdmin(user)):
            queryset = Ward.objects.all().filter(facility__admin=user)
        return queryset
    

class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def get_queryset(self):
        queryset = Room.objects.none()
        user = self.request._user
        if(isCityAdmin(user)):
            queryset = Room.objects.all().filter(ward__facility__city__admin=user)
        elif(isFacilityAdmin(user)):
            queryset = Room.objects.all().filter(ward__facility__admin=user)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data,many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class PersonViewSet(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

    def get_queryset(self):
        queryset = Person.objects.none()
        user = self.request._user
        if(isCityAdmin(user)):
            queryset = Person.objects.all().filter(room__ward__facility__city__admin=user)
        elif(isFacilityAdmin(user)):
            queryset = Person.objects.all().filter(room__ward__facility__admin=user)
        return queryset

class LuxuryViewSet(ModelViewSet):
    queryset = Luxury.objects.all()
    serializer_class = LuxurySerializer


class PersonAccomodationViewSet(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonAccomodationSerializer

    def get_queryset(self):
        queryset = Person.objects.none()
        user = self.request._user
        if(isCityAdmin(user)):
            queryset = Person.objects.all().filter(room__ward__facility__city__admin=user)
        elif(isFacilityAdmin(user)):
            queryset = Person.objects.all().filter(room__ward__facility__admin=user)
        return queryset

class MedicineViewSet(ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

class CheckupViewSet(ModelViewSet):
    queryset = CheckupRecords.objects.all()
    serializer_class = CheckupSerializer

    def get_queryset(self):
        queryset = CheckupRecords.objects.none()
        user = self.request._user
        if(isCityAdmin(user)):
            queryset = CheckupRecords.objects.all().filter(person__room__ward__facility__city__admin=user)
        elif(isFacilityAdmin(user)):
            queryset = CheckupRecords.objects.all().filter(person__room__ward__facility__admin=user)
        return queryset


class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)

        user = request.user
        for group in serializer.data:
            person_set = group['person_set']
            temp = []
            for person in person_set:
                facilty_pk = person['facility_pk']
                if facilty_pk == "None":
                    temp.append(person)
                elif(isCityAdmin(user) and Facility.objects.get(id=facilty_pk).city.admin == user):
                    temp.append(person)
                elif(isFacilityAdmin(user) and Facility.objects.get(id=facilty_pk).admin == user):
                    temp.append(person)
            person_set = temp
        return Response(serializer.data)

@api_view(['POST'])
def AllocateGroups(request):
    if request.method == "POST":
        groups_data = []
        groups = []
        for group_data in request.data:
            print(group_data)
            people_data = group_data.pop("person_set")
            group_serializer = GroupSerializer(data=group_data)
            if group_serializer.is_valid():
                group = group_serializer.save(person_set=people_data)
                if group is not None:
                    groups.append(group)
            else:
                return Response(group_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        allocation = allocate(groups)
        for group in groups:
            groups_data.append(GroupSerializer(group).data)

        return Response(groups_data)        
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


class DischargedViewSet(generics.ListCreateAPIView):
    queryset = Discharged.objects.all()
    serializer_class = DischargedSerializer

@api_view()
def null_view(request):
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view()
def complete_view(request):
    return Response("Email account is activated")

@api_view(['POST'])
def discharge_group(request):
    print(request.data)
    post_data = request.data
    print(post_data)
    group = Group.objects.get(id=post_data['group'])
    user = request.user
    for person in group.person_set.all():
        person.room = None
        person.save()
        try:
            Discharged(person=person).save()
        except Exception as e:
            if(str(e).find('UNIQUE constraint')==-1):
                return Response("Error Occured")
    return Response('done')



