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
    list_display = ['category','capacity','room_count','facility','occupant_count']

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ['name','owner','capacity','id','room_count','address','occupant_count']

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ['id','name','age','risk','address','room','vip']

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ['id','category','count','facility_preference']


@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ['name','cost']


@admin.register(CheckupRecords)
class CheckupRecordsAdmin(admin.ModelAdmin):
    list_display = ['person','doctor','date','health_status','next_checkup_date']

@admin.register(Discharged)
class DischargedAdmin(admin.ModelAdmin):
    list_display = ['person','date_discharged']

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ['name','admin']    
