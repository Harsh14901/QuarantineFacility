from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Count,Sum
from datetime import *
from django.core.cache import cache
from django.urls import resolve
from django.http.response import JsonResponse

DATE_FORMAT = '%d/%m/%y'
CACHE_TIME = 60*60
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
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        return cache.get(name)
    coordinates = {}
    queryset = Discharged.objects.values('date_discharged').annotate(Count('person'))
    for point in queryset:
        coordinates[point['date_discharged'].strftime(DATE_FORMAT)] = point['person__count']
    resp = JsonResponse(add_days(coordinates))
    cache.set(name,resp,CACHE_TIME)
    return resp


@api_view(['GET'])
def avg_discharge_time(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        return cache.get(name)
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
    resp = JsonResponse(add_days(coordinates))
    cache.set(name, resp, CACHE_TIME)
    return resp

@api_view(['GET'])
def new_cases(request=None):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        return cache.get(name)
    coordinates = {}
    queryset = Person.objects.values('doa').annotate(Count('doa'))
    for point in queryset:
        coordinates[point['doa'].strftime(DATE_FORMAT)] = point['doa__count']
    
    resp = JsonResponse(add_days(coordinates))
    cache.set(name, resp, CACHE_TIME)
    return resp

@api_view(['GET'])
def total_cases(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        return cache.get(name)
    coordinates = {}
    count = 0
    for person in Person.objects.all().order_by('doa'):
        doa = person.doa
        x = doa.strftime(DATE_FORMAT)
        if x not in coordinates.keys():
            count += Person.objects.filter(doa=doa).count()
            coordinates[x] = count
    resp = JsonResponse(add_days_special(coordinates))
    cache.set(name, resp, CACHE_TIME)
    return resp

@api_view(['GET'])
def active_cases(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        return cache.get(name)
    coordinates = {}
    curr_date = start_date
    total = total_cases(request=request._request).data
    discharged = total_discharges(request=request._request).data
    ans={}
    resp = (Response({day : total[day] - discharged[day] for day in total.keys()}))
    cache.set(name, resp, CACHE_TIME)
    return resp

@api_view(['GET'])
def cases_vs_age(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        return cache.get(name)
    coordinates = {age:0 for age in range(1,100)}
    for patient in Person.objects.all():
        coordinates[patient.age] += 1
    resp = JsonResponse(coordinates)
    cache.set(name, resp, CACHE_TIME)
    return resp

@api_view(['GET'])
def cases_vs_gender(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        return cache.get(name)
    print(Person.objects.all()[0].gender)
    distribution = {
        'male': Person.objects.filter(gender='Male').count(),
        'female': Person.objects.filter(gender='Female').count(),
        'other': Person.objects.filter(gender='Other').count(),
    }
    resp = JsonResponse(distribution)
    cache.set(name, resp, CACHE_TIME)
    return resp

@api_view(['GET'])
def total_discharges(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        return cache.get(name)
    coordinates = {}
    count = 0
    for person in Discharged.objects.all().order_by('date_discharged'):
        dod = person.date_discharged                                      # date of discharge
        x = dod.strftime(DATE_FORMAT)
        if x not in coordinates.keys():
            count += Discharged.objects.filter(date_discharged=dod).count()
            coordinates[x] = count
    resp = JsonResponse(add_days_special(coordinates))
    cache.set(name, resp, CACHE_TIME)
    return resp

@api_view(['GET'])
def get_ward_distribution(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        return cache.get(name)
    distribution = {'Ward-1':0,'Ward-2':0,'vacant':0}
    for room in Room.objects.all():
        if room.ward.category == Ward.WARD1:
            distribution['Ward-1'] += room.occupant_count
        else:
            distribution['Ward-2'] += room.occupant_count
        distribution['vacant'] += room.capacity - room.occupant_count
    resp = JsonResponse(distribution)
    cache.set(name, resp, CACHE_TIME)
    return resp
