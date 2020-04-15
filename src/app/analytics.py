from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Count,Sum


DATE_FORMAT = '%d/%m/%y'

@api_view(['GET'])
def discharge_count(request):
    coordinates = {}
    queryset = Discharged.objects.values('date_discharged').annotate(Count('person'))
    for point in queryset:
        coordinates[point['date_discharged'].strftime(DATE_FORMAT)] = point['person__count']
    return Response(coordinates)

@api_view(['GET'])
def avg_discharge_time(request):
    coordinates = {}
    total_discharge_time = dt.timedelta(0)
    count = 0

    for discharge in Discharged.objects.all().order_by('date_discharged'):
        date_discharged = discharge.date_discharged
        x = date_discharged.strftime(DATE_FORMAT)
        if x not in coordinates.keys():
            queryset = Discharged.objects.filter(date_discharged=date_discharged)
            for obj in queryset:
                total_discharge_time += obj.person.discharge_time
                count += 1
            coordinates[x] = total_discharge_time.days/count
        
    return Response(coordinates)
            

@api_view(['GET'])
def new_cases(request=None):
    coordinates = {}
    queryset = Person.objects.values('doa').annotate(Count('doa'))
    for point in queryset:
        coordinates[point['doa'].strftime(DATE_FORMAT)] = point['doa__count']
    return Response(coordinates)

@api_view(['GET'])
def total_cases(request):
    coordinates = {}
    count = 0
    for person in Person.objects.all().order_by('doa'):
        doa = person.doa
        x = doa.strftime(DATE_FORMAT)
        if x not in coordinates.keys():
            count += Person.objects.filter(doa=doa).count()
            coordinates[x] = count
    return Response(coordinates)
