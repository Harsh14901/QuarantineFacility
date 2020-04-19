from django.db import models
from phone_field import PhoneField
import datetime as dt
from django.contrib.auth.models import User

HIGH_RISK = "high"
LOW_RISK = "low"
RiskChoices=(
    (HIGH_RISK,"High"),
    (LOW_RISK,"Low"),
)


# Create your models here.
class City(models.Model):
    admin = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    name = models.CharField(max_length=50)
    latitude = models.FloatField( null=True, blank=True)
    longitude = models.FloatField( null=True, blank=True)

    def __str__(self):
        return self.name
    

class Person(models.Model):
    MALE = 'M'
    FEMALE = 'F'
    OTHER = 'Other'
    GenderChoices = (
        (MALE,"Male"),
        (FEMALE,"Female"),
        (OTHER,"Other"),
    )
    name = models.CharField(max_length=100)
    age = models.SmallIntegerField(blank=False, null=False)
    code = models.CharField(max_length=50,null=True,blank=True)
    gender = models.CharField(max_length=50,choices=GenderChoices,null=True)
    address = models.TextField()
    contact_num = PhoneField(null=True,blank=True)
    email = models.EmailField(max_length=254,null=True,blank=True)
    risk = models.CharField(choices=RiskChoices,max_length=50)
    group = models.ForeignKey("Group", on_delete=models.CASCADE)
    room = models.ForeignKey("Room", on_delete=models.CASCADE,null=True,blank=True) 
    luxuries = models.ManyToManyField("Luxury",blank=True)
    vip = models.BooleanField(default=False)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)

    #Date of Admission
    doa = models.DateField(auto_now=False, auto_now_add=True,null=True,blank=True)

    def __str__(self):
        return f"{self.name} | RISK is {self.risk}"

    def priority(self):
        pr = []
        pr.append(1 if self.group.highrisk else 2)
        pr.append(1 if self.group.category == Group.FAMILY else 2)
        pr.append(1 if self.group.vip else 2)
        pr.append(-self.age)
        return pr

    @property
    def facility_name(self):
        try:
            Facility.objects.get(id=self.facility_pk)
        except:
            return None
        return Facility.objects.get(id=self.facility_pk).name

    @property
    def room_pk(self):
        try:
            self.room.id
        except:
            return "None"
        return self.room.id

    @property
    def ward_pk(self):
        try:
            self.room.ward.id
        except:
            return "None"
        return self.room.ward.id

    @property
    def facility_pk(self):
        try:
            self.room.ward.facility.id
        except:
            return "None"
        return self.room.ward.facility.id 

    @property
    def discharge_time(self):
        try:
            discharge_date = self.discharged.date_discharged
            return discharge_date - self.doa
        except:
            return None
              

    

class Group(models.Model):
    FAMILY = "family"
    ADULTS = "adults"
    GroupType = (
        (FAMILY,"A family with children less than 17 years of age"),
        (ADULTS,"All adults above 18 years of age"),
    )

    category = models.CharField(choices=GroupType,max_length=100)
    facility_preference = models.ForeignKey("Facility", on_delete=models.CASCADE,null=True)
    
    def __str__(self):
        return f"{self.id} | {self.category} group of {self.count} members "
    
    @property
    def count(self):
        return len(self.person_set.all())
        
    @property
    def vip(self):
        for person in self.person_set.all():
            if person.vip:
                return True
        return False
    
    @property
    def highrisk(self):
        for person in self.person_set.all():
            if person.risk==HIGH_RISK:
                return True
        return False
     

class Facility(models.Model): 
    admin = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    city = models.ForeignKey("City", on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=500,blank=False,null=False)
    owner = models.CharField(max_length=100)
    address = models.TextField()
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    isVIP = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    @property
    def room_count(self):
        count = 0
        for ward in self.ward_set.all():
            count += ward.room_count
        return count

    @property
    def capacity(self):
        wards = self.ward_set.all()
        count = 0
        for ward in wards:
            count += ward.capacity
        return count
    
    @property
    def occupant_count(self):
        wards = self.ward_set.all()
        count = 0
        for ward in wards:
            count += ward.occupant_count
        return count


class Ward(models.Model):
    WARD1 = "1"
    WARD2 = "2"
    WardChoices = (
        (WARD1,"Ward 1"),
        (WARD2,"Ward 2"),
    )
    facility = models.ForeignKey("Facility", on_delete=models.CASCADE)
    category = models.CharField(
        choices=WardChoices, blank=False, null=False, max_length=50)

    def __str__(self):
        return f"{self.category} @ {str(self.facility)}"

    @property
    def room_count(self):
        return len(self.room_set.all())

    @property
    def capacity(self):
        rooms = self.room_set.all()
        count = 0
        for room in rooms:
            count += room.capacity
        return count

    @property
    def occupant_count(self):
        rooms = self.room_set.all()
        count = 0
        for room in rooms:
            count += room.occupant_count
        return count


class Room(models.Model):
    SLEEPER = "0"
    ECONOMY = "1"
    DELUXE = "2"
    SUPER_DELUXE = "3"
    RoomChoices = (
        (SLEEPER,"Sleeper"),
        (ECONOMY,"Economy"),
        (DELUXE,"Deluxe"),
        (SUPER_DELUXE,"Super Deluxe"),
    )
    category = models.CharField(choices=RoomChoices,max_length=50)
    room_num = models.CharField(max_length=10)
    floor = models.PositiveSmallIntegerField()
    area = models.FloatField(null=True,blank=True)
    ward = models.ForeignKey("Ward", on_delete=models.CASCADE) 
    capacity = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"room {self.room_num} @{self.ward.facility.name} | category: {self.category} | type : {self.ward.category} | Capacity: {self.capacity} | occupied: {len(self.person_set.all())}"


    @property
    def occupant_count(self):
        return len(self.person_set.all())

    @property
    def has_vacancy(self):
        return self.capacity > self.occupant_count
    

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
    cost = models.PositiveIntegerField()

    def __str__(self):
        return self.category
    

class CheckupRecords(models.Model):
    CRITICAL = "Critical"
    RISKY = "Risky"
    AVERAGE = "Average"
    GOOD = "Good"
    EXCELLENT = "Excellent"

    HealthChoices = (
        (CRITICAL,"Critical"),
        (RISKY,"Risky"),
        (AVERAGE,"Average"),
        (GOOD,"Good"),
        (EXCELLENT,"Excellent"),
    )

    person = models.ForeignKey("Person", on_delete=models.CASCADE)
    doctor = models.CharField(max_length=100,null=True,blank=True)
    date = models.DateField(auto_now=False, auto_now_add=True)
    health_status = models.CharField(max_length=50,choices=HealthChoices)
    medicines = models.ManyToManyField("Medicine")
    next_checkup_date = models.DateField(auto_now=False, auto_now_add=False,null=True,blank=True)

    def __str__(self):
        return f"{self.person} | Doctor: {self.doctor} on {self.date}"
    


class Medicine(models.Model):
    name = models.CharField(max_length=50)
    cost = models.PositiveIntegerField(null=True,blank=True)

    def __str__(self):
        return self.name
    
class Discharged(models.Model):
    person = models.OneToOneField("Person",  on_delete=models.CASCADE)
    date_discharged = models.DateField(auto_now=False, auto_now_add=True)
