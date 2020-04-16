from .models import *
import random
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from math import *
# from django.http import *

INFINITY = 1000000000

def get_sorted_rooms(person,facility):
    room_list = []
    for ward in facility.ward_set.all():
        if((person.risk == HIGH_RISK and ward.category == Ward.WARD1) or (person.risk == LOW_RISK and ward.category == Ward.WARD2)):
            for room in ward.room_set.all():
                room_list.append(room)
    if person.vip:
        room_list.sort(key=lambda x: x.category,reverse=True)
    else:
        random.shuffle(room_list)
    return room_list


def check_allocation_possible(person, **kwargs):

    if "ward_pk" in kwargs:
        ward_pk = kwargs.pop("ward_pk")
        risk_initial = person.risk
        person.risk = HIGH_RISK if (risk_initial == LOW_RISK) else LOW_RISK
        person.save()

        room_pk = check_allocation_possible(person,facility_pk=Ward.objects.get(id=ward_pk).facility.id)
        if room_pk is not None:
            return room_pk
        else:
            person.risk = risk_initial
            person.save()
            return

    elif "facility_pk" in kwargs:
        facility_pk = kwargs.pop("facility_pk")
        facility = Facility.objects.get(id=facility_pk)

        sorted_rooms = get_sorted_rooms(person,facility)

        for room in sorted_rooms:
            room_pk = check_allocation_possible(person,room_pk=room.id)
            if room_pk is not None:
                return room_pk
 

    elif "room_pk" in kwargs:
        room_pk = kwargs.pop("room_pk")
        room = Room.objects.get(id=room_pk)

        if room.has_vacancy:    #Checking if room has vacancy or not
            return room_pk
    else:
        return


def get_sorted_list(all_groups):
    
    all_dummy_patients = []
    for group in all_groups:
        if group.category == Group.ADULTS:
            all_dummy_patients += list(group.person_set.all())
        else:
            all_dummy_patients.append( group.person_set.latest('age') )

    all_dummy_patients.sort(key=lambda  x:x.priority())

    return all_dummy_patients

def make_allocation(patient):

    """ Allocation based on facility preference """
    print('allocating',patient)
        
    if(patient.group.category == Group.FAMILY):
        family = patient.group.person_set.all()
    else:
        family = [patient]
    

    allocated = True
    for i in range(len(family)):
        patient = family[i]
        
        try:
            fac_pref = 8
            fac_pref = patient.group.facility_preference.id
        except:
            allocated = False
            break
        
        room_pk = check_allocation_possible(patient, facility_pk=fac_pref)
        if room_pk is not None:
            patient.room = Room.objects.get(id=room_pk)
            patient.save()
        else:
            for human in family[:i]:
                human.room = None
                human.doa = None
                human.save()
            allocated = False
            break  
          
    if allocated:
        return True
    else:
        print('allocating through GEO API')
        row = get_all_distances(patient)
        for facility in row:
            allocated = True
            for i in range(len(family)):
                patient = family[i]
                room_pk = check_allocation_possible(patient, facility_pk=facility.id)
                if room_pk is not None:
                    patient.room = Room.objects.get(id=room_pk)
                    patient.save()        
                else:
                    for human in family[:i]:
                        human.room = None
                        human.doa = None
                        human.save()
                    allocated = False
                    break    
            if allocated:
                return True
        if not allocated:
            pass  


    return False


def allocate(groups):
    patients = get_sorted_list(groups)
    failed = []
    for patient in patients:
        if patient.room is not None:
            continue
        if not make_allocation(patient):
            failed.append(patient)
        else:
            patient = Person.objects.get(pk=patient.id)
            print('{} successfully allocated in {}'.format(patient,patient.room))
            pass

    if failed != []:
        return failed
    
    return

'''
enter location in form of string or comma separated latitude and longitude
eg : '49.932707,11.588051'
'''
def naive_distance(p1,p2):
    return sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)

def sort_naively(p1):
    unsorted = []
    for facility in Facility.objects.all():
        p2=(facility.latitude,facility.longitude)
        unsorted.append((naive_distance(p1,p2),facility))
    sorted_pairs = sorted(unsorted,key=lambda x:x[0])
    print(sorted_pairs)
    return [pair[1] for pair in sorted_pairs]

def get_all_distances(patient):
    p1=(float(patient.latitude),float(patient.longitude))
    half_sorted = sort_naively(p1)
    print(half_sorted)
    p1='{},{}'.format(patient.latitude,patient.longitude)
    all_facilities = []

    list_facility_location = ['{},{}'.format(facility.latitude,facility.longitude) for facility in half_sorted]
    list_facility_location=list_facility_location[0:10]

    key='efe1c6b8-2b70-4252-a030-7d7f9ae2be5c'
    url='https://graphhopper.com/api/1/matrix'
    params={
        'from_point':p1, 
        'to_point':list_facility_location,
        'type': 'json',
        'vehicle':'car',
        'out_array':'distances',
        'key':key,
    }
    r=requests.get(url=url,params=params)
    data = r.json()
    all_distances = []
    if 'distances' in data.keys():
        for i in range(len(list_facility_location)):
            dist = data['distances'][0][i]
            all_distances.append((dist,half_sorted[i]))
        all_distances.sort(key=lambda x:x[0])
        print(all_distances)
        all_facilities = [pair[1] for pair in all_distances]

        if len(half_sorted)>10:
            all_facilities += half_sorted[10:]
    else:
        all_facilities = half_sorted
        print('API call failed ... using point to point distances')
    return all_facilities


def set_location(obj):
    p1=f"{obj['latitude']},{obj['longitude']}"
    key='efe1c6b8-2b70-4252-a030-7d7f9ae2be5c'
    url='https://graphhopper.com/api/1/geocode'
    params={
        'point':p1,
        'reverse':'true',
        'debug':'true',
        'key':key,
    }
    r=requests.get(url=url,params=params)
    
    try:
        point = r.json()['hits'][0]['point']
    except:
        print( f'could not locate address lat {p1}' )
    else:
        obj['latitude'] = point['lat']
        obj['longitude'] = point['lng']
    
        


@api_view(['GET'])
def getClosestFacilities(request):
    dummy = Person(
        latitude=request.GET['latitude'],
        longitude=request.GET['longitude'],
    )
    a=get_all_distances(dummy)
    # print(a)
    return Response({'id':f.id,'name':f.name} for f in a)