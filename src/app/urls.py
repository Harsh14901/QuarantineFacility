from django.urls import path
from django.conf.urls import include, url
from .views import *
from rest_framework.routers import DefaultRouter
import requests
from .models import *
from .analytics import *
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
    url(r'^allocate/$',AllocateGroups,name="allocate"),
    url(r'^discharge/$',DischargedViewSet.as_view(),name="discharge"),
    url(r'^person/search/$',searchPerson,name="search_user"),
    url(r'^facility/search/$',searchFacility,name="search_facility"),
    url(r'^analytics/avg_discharge_time/$',avg_discharge_time,name="avg_discharge_time"),
    url(r'^analytics/discharge_count/$',discharge_count,name="discharge_count"),
]
