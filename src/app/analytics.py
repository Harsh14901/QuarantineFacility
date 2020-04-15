from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Count


DATE_FORMAT = '%d/%m/%y'

@api_view(['GET'])
def discharge_count(request):
    coordinates = {}
    queryset = Discharged.objects.values('date_discharged').annotate(Count('person'))
    for point in queryset:
        coordinates[str(point['date_discharged'])] = point['person__count']
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
            

