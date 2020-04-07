from .models import *
import random


def check_allocation_possible(person, **kwargs):

    # if(person.group.category == Group.FAMILY and not()):
    if "facility_pk" in kwargs:
        facility_pk = kwargs.pop("facility_pk")
        facility = Facility.objects.get(facility_pk)
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


# person = Person.objects.get(id=1)
# wl = Ward.objects.all()
# w = wl[random.randint(0, len(wl)-1)]
# res = check_allocation_possible(person, ward_pk=w.id)
