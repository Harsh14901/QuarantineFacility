from django.urls import path
from django.conf.urls import include, url
from .views import *
from rest_framework.routers import DefaultRouter

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
    url(r'^index/$',index,name="index")
]
