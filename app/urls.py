from django.urls import path
from django.conf.urls import include, url
from .views import *
from rest_framework.routers import DefaultRouter
import requests
from .models import *
from .analytics import *
from .algo import *
import random


router = DefaultRouter()
router.register(r'cities',CityViewSet)
router.register(r'facilities',FacilityViewSet)
router.register(r'wards',WardViewSet)
router.register(r'rooms',RoomViewSet)
router.register(r'people',PersonViewSet)
router.register(r'groups',GroupViewSet)
router.register(r'luxuries',LuxuryViewSet)
router.register(r'medicines',MedicineViewSet)
router.register(r'checkup-records',CheckupViewSet)
router.register(r'person-accomodation',PersonAccomodationViewSet)
router.register(r'discharge',DischargedViewSet)
urlpatterns = [
    url('',include(router.urls)),
    url(r'^index/$',index,name="index"),
    url(r'^allocate/$',AllocateGroups,name="allocate"),
    url(r'^discharge_group/$',discharge_group,name="discharge_group"),
    url(r'^person/search/$',searchPerson,name="search_user"),
    url(r'^facility/search/$',searchFacility,name="search_facility"),

    url(r'^analytics/avg_discharge_time/$',avg_discharge_time,name="avg_discharge_time"),
    url(r'^analytics/new_cases/$',new_cases,name="new_cases"),
    url(r'^analytics/total_cases/$',total_cases,name="total_cases"),
    url(r'^analytics/active_cases/$',active_cases,name="active_cases"),
    url(r'^analytics/discharge_count/$',discharge_count,name="discharge_count"),
    url(r'^analytics/total_discharges/$',total_discharges,name="total_discharges"),
    url(r'^analytics/cases_vs_age/$',cases_vs_age,name="cases_vs_age"),
    url(r'^analytics/cases_vs_gender/$',cases_vs_gender,name="cases_vs_gender"),
    url(r'^analytics/ward_distribution/$',get_ward_distribution,name="ward_distribution"),

    url(r'^get_nearest_facilities/$',getClosestFacilities,name="getClosestFacilities")

]
