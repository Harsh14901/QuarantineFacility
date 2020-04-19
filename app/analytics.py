from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Count,Sum
from datetime import *

DATE_FORMAT = '%d/%m/%y'
start_date = datetime(2020,4,1)


def add_days(coordinates):                                  #fill in values of new_cases
    curr_date = start_date
    while curr_date < datetime.now():
        if not curr_date.strftime(DATE_FORMAT) in coordinates.keys():
            print(curr_date)
            coordinates[curr_date.strftime(DATE_FORMAT)] = 0
        curr_date += timedelta(days=1)
    
    # sort
    ans = dict()
    for key in sorted(coordinates):
        ans[key] = coordinates[key]
    return ans

def add_days_special(coordinates):                        # fill in values of total_cases
    curr_date = start_date
    last=0
    while curr_date < datetime.now():
        if not curr_date.strftime(DATE_FORMAT) in coordinates.keys():
            coordinates[curr_date.strftime(DATE_FORMAT)] = last
        else:
            last = coordinates[curr_date.strftime(DATE_FORMAT)]
        curr_date += timedelta(days=1)

    # sort
    ans = dict()
    for key in sorted(coordinates):
        ans[key] = coordinates[key]
    return ans
    

@api_view(['GET'])
def discharge_count(request):
    coordinates = {}
    queryset = Discharged.objects.values('date_discharged').annotate(Count('person'))
    for point in queryset:
        coordinates[point['date_discharged'].strftime(DATE_FORMAT)] = point['person__count']
    return Response(add_days(coordinates))

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
    return Response(add_days(coordinates))
            

@api_view(['GET'])
def new_cases(request=None):
    coordinates = {}
    queryset = Person.objects.values('doa').annotate(Count('doa'))
    for point in queryset:
        coordinates[point['doa'].strftime(DATE_FORMAT)] = point['doa__count']
    
    return Response(add_days(coordinates))


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
    return Response(add_days_special(coordinates))

@api_view(['GET'])
def active_cases(request):
    print(request)
    coordinates = {}
    curr_date = start_date
    total = total_cases(request=request._request).data
    discharged = total_discharges(request=request._request).data
    ans={}
    return(Response({day : total[day] - discharged[day] for day in total.keys()}))

@api_view(['GET'])
def cases_vs_age(request):
    coordinates = {age:0 for age in range(1,100)}
    for patient in Person.objects.all():
        coordinates[patient.age] += 1
    return Response(coordinates)

@api_view(['GET'])
def cases_vs_gender(request):
    print(Person.objects.all()[0].gender)
    distribution = {
        'male': Person.objects.filter(gender='Male').count(),
        'female': Person.objects.filter(gender='Female').count(),
        'other': Person.objects.filter(gender='Other').count(),
    }
    return Response(distribution)

@api_view(['GET'])
def total_discharges(request):
    coordinates = {}
    count = 0
    for person in Discharged.objects.all().order_by('date_discharged'):
        dod = person.date_discharged                                      # date of discharge
        x = dod.strftime(DATE_FORMAT)
        if x not in coordinates.keys():
            count += Discharged.objects.filter(date_discharged=dod).count()
            coordinates[x] = count
    return Response(add_days_special(coordinates))

@api_view(['GET'])
def get_ward_distribution(request):
    distribution = {'Ward-1':0,'Ward-2':0,'vacant':0}
    for room in Room.objects.all():
        if room.ward.category == Ward.WARD1:
            distribution['Ward-1'] += room.occupant_count
        else:
            distribution['Ward-2'] += room.occupant_count
        distribution['vacant'] += room.capacity - room.occupant_count
    return Response(distribution)