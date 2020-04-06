from rest_framework import serializers
from .models import *
from .algo import *
from rest_framework.exceptions import ValidationError

class FacilitySerializer(serializers.ModelSerializer):
    class Meta():
        model = Facility
        fields = ['id','name','owner','address','capacity','room_count','ward_list']

class WardSerializer(serializers.ModelSerializer):
    class Meta():
        model = Ward
        fields = ['id','category','room_count','capacity','room_list']

class RoomSerializer(serializers.ModelSerializer):
    class Meta():
        model = Room
        fields = ['id','category','room_num','floor','area','capacity','occupant_list']

class PersonSerializer(serializers.ModelSerializer):
    class Meta():
        model = Person
        fields = ['id','name','age','contact_num','email','risk','vip','luxuries','group']

class GroupSerializer(serializers.ModelSerializer):
    class Meta():
        model = Group
        fields = ['id','category','count']

class LuxurySerializer(serializers.ModelSerializer):
    class Meta:
        model = Luxury
        fields = ['id','category','cost']

class PersonAccomodationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['room_pk','ward_pk','facility_pk']

    def save(self, **kwargs):
        if "room_pk" in self.validated_data.keys():
            room_pk = self.validated_data.pop("room_pk")
            person = self.instance
            person.room = Room.objects.get(id=room_pk)
            person.save()
        return super().save(**kwargs)
    
        
    def is_valid(self, raise_exception=False):
        room_pk = check_allocation_possible(self._args[0],**self.initial_data)
        if(room_pk is not None):
            self._validated_data = {"room_pk": room_pk}
            self._errors = {}
        else:
            raise ValidationError(detail="Could not change accomodation, No space available",code="accomodation failed")
        a = super().is_valid(raise_exception=raise_exception)
        
        return a and (room_pk is not None)

    

