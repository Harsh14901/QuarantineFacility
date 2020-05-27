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
start_date = date(2020,4,1)
print(start_date,'start')
 

def add_days(coordinates):                                  #fill in values of new_cases
    curr_date = start_date
    while datetime.combine(curr_date,datetime.min.time()) < datetime.now():
        if not curr_date in coordinates.keys():
            print(curr_date)
            coordinates[curr_date] = 0
        curr_date += timedelta(days=1)
    
    # sort
    ans = dict()
    for key in sorted(coordinates):
        ans[key.strftime(DATE_FORMAT)] = coordinates[key]
    return ans

def add_days_special(coordinates):                        # fill in values of total_cases
    curr_date = start_date
    last=0
    while datetime.combine(curr_date,datetime.min.time()) < datetime.now():
        if not curr_date in coordinates.keys():
            coordinates[curr_date] = last
        else:
            last = coordinates[curr_date]
        curr_date += timedelta(days=1)

    # sort
    ans = dict()
    print(coordinates)
    for key in sorted(coordinates):
        ans[key.strftime(DATE_FORMAT)] = coordinates[key]
    return ans
    

@api_view(['GET'])
def discharge_count(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        print(f"Sending a cached response to {request.path}")
        return cache.get(name)
    coordinates = {}
    queryset = Discharged.objects.values('date_discharged').annotate(Count('person'))
    for point in queryset:
        coordinates[point['date_discharged']] = point['person__count']
    resp = JsonResponse(add_days(coordinates))
    cache.set(name,resp,CACHE_TIME)
    return resp


@api_view(['GET'])
def avg_discharge_time(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        print(f"Sending a cached response to {request.path}")
        return cache.get(name)
    coordinates = {}
    total_discharge_time = dt.timedelta(0)
    count = 0

    for discharge in Discharged.objects.all().order_by('date_discharged'):
        date_discharged = discharge.date_discharged
        x = date_discharged
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
        print(f"Sending a cached response to {request.path}")
        return cache.get(name)
    coordinates = {}
    queryset = Person.objects.values('doa').annotate(Count('doa'))
    for point in queryset:
        coordinates[point['doa']] = point['doa__count']
    
    resp = JsonResponse(add_days(coordinates))
    cache.set(name, resp, CACHE_TIME)
    return resp

@api_view(['GET'])
def total_cases(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        print(f"Sending a cached response to {request.path}")
        return cache.get(name)
    coordinates = {}
    count = 0
    for person in Person.objects.all().order_by('doa'):
        doa = person.doa
        x = doa
        if x not in coordinates.keys():
            count += Person.objects.filter(doa=doa).count()
            coordinates[x] = count

    modified_coordinates = add_days_special(coordinates)
    print('the data is',modified_coordinates)
    resp = JsonResponse(modified_coordinates)
    cache.set(name, resp, CACHE_TIME)
    return resp

@api_view(['GET'])
def active_cases(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        print(f"Sending a cached response to {request.path}")
        return cache.get(name)
    coordinates = {}
    count = 0
    for person in Person.objects.all().order_by('doa'):
        doa = person.doa
        x = doa
        if x not in coordinates.keys():
            count += Person.objects.filter(doa=doa).exclude(room__isnull=True).count()
            coordinates[x] = count
    resp = JsonResponse(add_days_special(coordinates))
    cache.set(name, resp, CACHE_TIME)
    return resp

@api_view(['GET'])
def cases_vs_age(request):
    name = resolve(request._request.path).url_name
    if cache.get(name) is not None:
        print(f"Sending a cached response to {request.path}")
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
        print(f"Sending a cached response to {request.path}")
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
        print(f"Sending a cached response to {request.path}")
        return cache.get(name)
    coordinates = {}
    count = 0
    for person in Discharged.objects.all().order_by('date_discharged'):
        dod = person.date_discharged                                      # date of discharge
        x = dod
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
        print(f"Sending a cached response to {request.path}")
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
