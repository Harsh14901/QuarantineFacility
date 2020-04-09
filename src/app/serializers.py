from rest_framework import serializers
from .models import *
from .algo import *
from rest_framework.exceptions import ValidationError



class LuxurySerializer(serializers.ModelSerializer):
    class Meta:
        model = Luxury
        fields = ['id','category','cost']

class MedicineSerializer(serializers.ModelSerializer):
    class Meta():
        model = Medicine
        fields = ['name','cost']

class CheckupSerializer(serializers.ModelSerializer):
    class Meta():
        model = CheckupRecords
        fields = ['id','person','doctor','date','health_status','medicines','next_checkup_date']

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


class PersonSerializer(serializers.ModelSerializer):
    checkuprecords_set = CheckupSerializer(many=True,read_only=True)

    class Meta():
        model = Person
        fields = ['id', 'name', 'age', 'contact_num', 'email', 'risk', 'vip',
                  'luxuries', 'group', 'latitude', 'longitude','room' ,'checkuprecords_set']
     

class GroupSerializer(serializers.ModelSerializer):
    person_set = PersonSerializer(many=True,read_only=True)

    def create(self, validated_data):
        people_data = validated_data.pop("person_set")
        group = Group.objects.create(**validated_data)
        for person_data in people_data:
            person_data['group'] = group.id
            person_serializer = PersonSerializer(data=person_data)
            if person_serializer.is_valid():
                person = person_serializer.save()
            else:
                group.delete()
                raise ValidationError(person_serializer.errors)
        return group 
   
    
    class Meta():
        model = Group
        fields = ['id', 'category', 'count', 'facility_preference', 'person_set']



class RoomSerializer(serializers.ModelSerializer):
    person_set = PersonSerializer(many=True,read_only=True)

    class Meta():
        model = Room
        fields = ['id','ward', 'category', 'room_num',
                  'floor', 'area', 'capacity', 'person_set']


class WardSerializer(serializers.ModelSerializer):
    room_set = RoomSerializer(many=True,read_only=True)

    class Meta():
        model = Ward
        fields = ['id','facility', 'category', 'room_count', 'capacity', 'room_set']


class FacilitySerializer(serializers.ModelSerializer):
    ward_set = WardSerializer(many=True,read_only=True)

    class Meta():
        model = Facility
        fields = ['id', 'name', 'owner', 'address', 'capacity',
                  'room_count', 'ward_set', 'latitude', 'longitude']
