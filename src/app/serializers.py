from rest_framework import serializers
from .models import *

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