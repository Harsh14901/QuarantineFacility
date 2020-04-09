from .models import *
import random
import requests


def check_allocation_possible(person, **kwargs):

    if "facility_pk" in kwargs:
        facility_pk = kwargs.pop("facility_pk")
        facility = Facility.objects.get(id=facility_pk)
        for ward in facility.ward_set.all():
            room_pk = check_allocation_possible(person, ward_pk=ward.id)
            if room_pk is not None:
                return room_pk

    elif "ward_pk" in kwargs:
        ward_pk = kwargs.pop("ward_pk")
        ward = Ward.objects.get(id=ward_pk)

        # Check if the risk level matches the ward it is being allocated to
        if((person.risk == HIGH_RISK and ward.category == Ward.WARD1) or (person.risk == LOW_RISK and ward.category == Ward.WARD2)):
            for room in ward.room_set.all():
                room_pk = check_allocation_possible(person, room_pk=room.id)
                if room_pk is not None:
                    return room_pk

    elif "room_pk" in kwargs:
        room_pk = kwargs.pop("room_pk")
        room = Room.objects.get(id=room_pk)

        # Checks if room is vacant or not
        if room.has_vacancy:
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
                human.save()
            allocated = False
            break    
    if allocated:
        return True
    else:
        
        row = get_all_distances(patient)
        for fac_tuple in row:
            allocated = True
            for i in range(len(family)):
                patient = family[i]
                room_pk = check_allocation_possible(patient, facility_pk=fac_tuple[1].id)
                if room_pk is not None:
                    patient.room = Room.objects.get(id=room_pk)
                    patient.save()
                else:
                    for human in family[:i]:
                        human.room = None
                        human.save()
                    allocated = False
                    print('sry')
                    break    
            if allocated:
                return True      
    

    return False


def allocate(groups):
    patients = get_sorted_list(groups)
    failed = []
    for patient in patients:
        if patient.room is not None:
            continue
        if not make_allocation(patient):
            failed.append(patient)

    if failed != []:
        return failed
    
    return

'''
enter location in form of string or comma separated latitude and longitude
eg : '49.932707,11.588051'
'''
def get_distance(p1,p2):
    key='efe1c6b8-2b70-4252-a030-7d7f9ae2be5c'
    url='https://graphhopper.com/api/1/matrix'
    params={
        'from_point':p1, 
        'to_point':p2,
        'type': 'json',
        'vehicle':'car',
        'out_array':'distances',
        'key':key,
    }
    r=requests.get(url=url,params=params)
    data = r.json()
    distance = data['distances'][0][0]
    return distance
# get_distance('49.932,11.051','50.817,11.337')

def get_all_distances(patient):
    p1='{},{}'.format(patient.latitude,patient.longitude)
    d=[]
    for facility in Facility.objects.all():
        try:
            p2='{},{}'.format(facility.latitude,facility.longitude)
            d.append((get_distance(p1,p2),facility))    
        except:
            print('wrong location',facility,patient)
    d.sort(key=lambda x:x[0])
    print(d)  
    return d

def set_location(obj):
    try:
        p1='{},{}'.format(random.random()+22,random.random()+88)
        key='efe1c6b8-2b70-4252-a030-7d7f9ae2be5c'
        url='https://graphhopper.com/api/1/geocode'
        params={
            'point':p1,
            'reverse':'true',
            'debug':'true',
            'key':key,
        }
        r=requests.get(url=url,params=params)
        # print(r.url)
        point = r.json()['hits'][0]['point']
        obj.address = r.json()['hits'][0]['name']
        obj.latitude = point['lat']
        obj.longitude = point['lng']
        obj.save()
    except:
        set_location(obj)

def locate_facilities():
    for facility in Facility.objects.all():
        set_location(facility)

def locate_persons():
    for person in Person.objects.all():
        set_location(person)
        


