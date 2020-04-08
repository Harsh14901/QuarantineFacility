from django.urls import path
from django.conf.urls import include, url
from .views import *
from rest_framework.routers import DefaultRouter
import requests
from .models import *
import random

router = DefaultRouter()
router.register(r'facilities',FacilityViewSet)
router.register(r'wards',WardViewSet)
router.register(r'rooms',RoomViewSet)
router.register(r'people',PersonViewSet)
router.register(r'groups',GroupViewSet)
router.register(r'luxuries',LuxuryViewSet)
router.register(r'medicines',MedicineViewSet)
router.register(r'checkup-records',CheckupViewSet)
router.register(r'person-accomodation',PersonAccomodationViewSet)
urlpatterns = [
    url('',include(router.urls)),
    url(r'^index/$',index,name="index"),
    url(r'^person/search/$',searchPerson,name="search_user"),
    url(r'^facility/search/$',searchFacility,name="search_facility"),

]

# for facility in Facility.objects.all():
#     facility.latitude = 

# kh = Facility.objects.all()[0]
# kh.latitude=22.4606543
# kh.longitude=88.420414
# kh.save()
# err=0
# suc=0
# for facility in Facility.objects.all():
#     p2='{},{}'.format(facility.latitude,facility.longitude)
#     err=0
#     for person in Person.objects.all():
#         p1='{},{}'.format(person.latitude,person.longitude)
#         print(p1,p2)
#         d=0
#         try:
#             d=get_distance(p1,p2)
#             suc+=1
#             # print(suc,'success')
#         except :
#             err+=1
#             print(err,'errors')
#             # if err>2:break
      
#         print(d)
#         print()
        


