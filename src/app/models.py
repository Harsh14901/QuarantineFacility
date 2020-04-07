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
    room = models.ForeignKey("Room", on_delete=models.CASCADE,null=True,blank=True) 
    luxuries = models.ManyToManyField("Luxury",blank=True)
    vip = models.BooleanField()

    def __str__(self):
        return f"{self.name} | RISK is {self.risk}"

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
    def checkup_records(self):
        from app.serializers import CheckupSerializer
        records = self.checkuprecords_set.all()
        serializer = CheckupSerializer(records,many=True)
        return serializer.data

class Group(models.Model):
    FAMILY = "family"
    ADULTS = "adults"
    GroupType = (
        (FAMILY,"A family with children less than 17 years of age"),
        (ADULTS,"All adults above 18 years of age"),
    )

    count = models.PositiveIntegerField(blank=False, null=False, default=0)
    category = models.CharField(choices=GroupType,max_length=100)
    facility_preference = models.ForeignKey("Facility", on_delete=models.CASCADE,null=True)
    
    def __str__(self):
        return f"{self.category} group of {self.count} members"
    

class Facility(models.Model):   
    name = models.CharField(max_length=500,blank=False,null=False)
    owner = models.CharField(max_length=100)
    address = models.TextField()
    room_count = models.PositiveIntegerField()

    def __str__(self):
        return self.name

    @property
    def ward_list(self):
        from app.serializers import WardSerializer
        ward_list =  self.ward_set.all()
        serializer = WardSerializer(ward_list,many=True)
        return serializer.data

    @property
    def capacity(self):
        wards = self.ward_set.all()
        count = 0
        for ward in wards:
            count += ward.capacity
        return count
    
    @property
    def occupancy_count(self):
        wards = self.ward_set.all()
        count = 0
        for ward in wards:
            count += ward.occupancy_count
        return count


class Ward(models.Model):
    WARD1 = "1"
    WARD2 = "2"
    WardChoices = (
        (WARD1,"Ward 1"),
        (WARD2,"Ward 2"),
    )
    room_count = models.PositiveIntegerField()
    facility = models.ForeignKey("Facility", on_delete=models.CASCADE)
    category = models.CharField(
        choices=WardChoices, blank=False, null=False, max_length=50)

    def __str__(self):
        return f"{self.category} @ {str(self.facility)}"

    @property
    def room_list(self):
        from app.serializers import RoomSerializer
        room_list = self.room_set.all()
        serializer = RoomSerializer(room_list, many=True)
        return serializer.data
    
    @property
    def capacity(self):
        rooms = self.room_set.all()
        count = 0
        for room in rooms:
            count += room.capacity
        return count

    @property
    def occupancy_count(self):
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
    room_num = models.PositiveSmallIntegerField()
    floor = models.PositiveSmallIntegerField()
    area = models.FloatField()
    ward = models.ForeignKey("Ward", on_delete=models.CASCADE) 
    capacity = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.room_num} | Capacity: {self.capacity}"

    @property
    def occupant_list(self):
        from app.serializers import PersonSerializer
        occupant_list = self.person_set.all()
        serializer = PersonSerializer(occupant_list, many=True)
        return serializer.data

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
    