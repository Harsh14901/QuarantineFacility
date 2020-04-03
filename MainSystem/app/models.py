from django.db import models
from phone_field import PhoneField

HIGH_RISK = "high"
LOW_RISK = "low"
RiskChoices=(
    (HIGH_RISK,"High"),
    (LOW_RISK,"Low"),
)


# Create your models here.
class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.SmallIntegerField(blank=False, null=False)
    address = models.TextField()
    contact_num = PhoneField()
    email = models.EmailField(max_length=254)
    risk = models.CharField(choices=RiskChoices,max_length=50)
    group = models.ForeignKey("Group", on_delete=models.CASCADE)
    room = models.ForeignKey("Room", on_delete=models.CASCADE) 
    luxuries = models.ManyToManyField("Luxury")
    vip = models.BooleanField()

class Group(models.Model):
    FAMILY = "family"
    ADULTS = "adults"
    GroupType = (
        (FAMILY,"A family with children less than 17 years of age"),
        (ADULTS,"All adults above 18 years of age"),
    )

    count = models.PositiveIntegerField(blank=False, null=False, default=0)
    category = models.CharField(choices=GroupType,max_length=100)
    # 

class Facility(models.Model):   
    name = models.CharField(max_length=500,blank=False,null=False)
    owner = models.CharField(max_length=100)
    address = models.TextField()
    capacity = models.PositiveIntegerField()
    room_count = models.PositiveIntegerField()

class Ward(models.Model):
    WARD1 = "1"
    WARD2 = "2"
    WardChoices = (
        (WARD1,"Ward 1"),
        (WARD2,"Ward 2"),
    )
    capacity = models.PositiveIntegerField()
    room_count = models.PositiveIntegerField()
    facility = models.ForeignKey("Facility", on_delete=models.CASCADE)
    category = models.CharField(
        choices=WardChoices, blank=False, null=False, max_length=50)

class Room(models.Model):
    SLEEPER = "0"
    ECONOMY = "1"
    DELUXE = "2"
    SUPER_DELUXE = "3"
    CategoryChoices = (
        (SLEEPER,"Sleeper"),
        (ECONOMY,"Economy"),
        (DELUXE,"Deluxe"),
        (SUPER_DELUXE,"Super Deluxe"),
    )
    room_num = models.PositiveSmallIntegerField()
    floor = models.PositiveSmallIntegerField()
    area = models.FloatField()
    ward = models.ForeignKey("Ward", on_delete=models.CASCADE) 
    capacity = models.PositiveSmallIntegerField()

class Luxury(models.Model):
    TV = "led_tv"
    WIFI = "free wifi"
    FRIDGE = "fridge"
    AC = "ac"
    HEATER = "heater"
    MICROWAVE = "microwave"
    KETTLE = "kettle"

    LuxuryItems = (
        (TV,"LED TV"),
        (WIFI,"Free WiFi"),
        (FRIDGE,"Refrigerator"),
        (AC,"Air Conditioner"),
        (HEATER,"Heater"),
        (MICROWAVE,"Microwave"),
        (KETTLE,"Kettle"),
    )

    category = models.CharField(choices=LuxuryItems,max_length=50)
