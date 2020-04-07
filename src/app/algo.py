from .models import *
import random


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
    try:
        
        if(patient.group.category == Group.FAMILY):
            family = patient.group.person_set.all()
        else:
            family = [patient]
        

        allocated = True
        for i in range(len(family)):
            patient = family[i]
            fac_pref = patient.group.facility_preference.id
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
    except:
        pass
    
    
        """ Allocation considering proximity. """

    
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
