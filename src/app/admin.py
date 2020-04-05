from django.contrib import admin
from .models import *

# Register your models here.


@admin.register(Luxury)
class LuxuryAdmin(admin.ModelAdmin):
    list_display = ['category','cost'] 

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['room_num','floor','capacity','ward','occupant_count']

@admin.register(Ward)
class WardAdmin(admin.ModelAdmin):
    list_display = ['category','capacity','room_count','facility','occupancy_count']

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ['name','owner','capacity','room_count','address','occupancy_count']

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ['name','age','risk','address','room','vip']

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ['category','count','facility_preference']




