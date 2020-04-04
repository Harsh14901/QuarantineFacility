from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Facility)
admin.site.register(Ward)
admin.site.register(Room)
admin.site.register(Person)
admin.site.register(Group)
admin.site.register(Luxury)