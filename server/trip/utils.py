import requests
import django
import math
# from server import settings
# from server.server import settings
import json
from django.conf import settings
import re



def get_address(address):
    response = requests.get(f'http://dev.virtualearth.net/REST/v1/Locations?locality={address}&adminDistrict=NG&key={settings.BING_MAPS_API_KEY}')
    response = json.loads(response.content)
    main_resource = response['resourceSets'][0]
    estimatedTotal = main_resource['estimatedTotal']
    print()
    print("You are getting your info by Address")
    print()
    
    try:
        resource = main_resource['resources'][0]
        coordinates = resource['point']['coordinates']
        address = resource['address']
        admin_district = address['adminDistrict']
        # admin_district_2 = address['adminDistrict2']
        country = address['countryRegion']
        formatted_address = address['formattedAddress']
        locality = address['locality']
        latitude = coordinates[0]
        longitude = coordinates[1]
        actual_address = locality + ', ' + admin_district + ', ' + country
        data = {'formatted_address':actual_address,'longitude':longitude,'latitude':latitude}
        # print(json.dumps(resource,indent=1))
        return data
        
    except IndexError as e:
        # print('Location Not Found')
        return {}

def get_address_by_point(longitude,latitude):
    response = requests.get(f'https://dev.virtualearth.net/REST/v1/Locations/{latitude},{longitude}?&key={settings.BING_MAPS_API_KEY}') 
    print()
    print("You are getting your info by longitude and latitude")
    print()
    response = json.loads(response.content)
    main_resource = response['resourceSets'][0]

    try:
        resource = main_resource['resources'][0]
        coordinates = resource['point']['coordinates']
        address = resource['address']
        admin_district = address['adminDistrict']
        # admin_district_2 = address['adminDistrict2']
        country = address['countryRegion']
        formatted_address = address['formattedAddress']
        try:
            locality = address['locality'] +', '
        except KeyError as e:
            locality = ''
        latitude = coordinates[0]
        longitude = coordinates[1]
        actual_address = locality + admin_district + ', ' + country
        data = {'formatted_address':actual_address,'longitude':longitude,'latitude':latitude}
        #data = {'address':address}
        # print(json.dumps(resource,indent=1))
        # print(data)
        return data
        
    except IndexError as e:
        # print('Location Not Found')
        return {}


# def get_route(source_latittude,source_longitude,dest_latitude,dest_longitude):
def get_route(sourceLatitude,sourceLongitude,destLatitude,destLongitude):
    response = requests.get(f'https://dev.virtualearth.net/REST/v1/Routes/Driving?waypoint.1={sourceLatitude},{sourceLongitude}&waypoint.2={destLatitude},{destLongitude}&key={settings.BING_MAPS_API_KEY}')
    response = json.loads(response.content)
    resource = response['resourceSets'][0]['resources'][0]['routeLegs'][0]
    distance = response['resourceSets'][0]['resources'][0]['routeLegs'][0]['travelDistance']
    duration = response['resourceSets'][0]['resources'][0]['routeLegs'][0]['travelDuration']
    # Conerting seconds into minutes
    duration /= 60
    # Rounding minutes to 1 d.p
    duration = round(duration,1)
    # Rounding distance to 2 d.p
    distance = round(distance,2) 
    #Getting the price 1km = 330 NGN
    price = math.ceil(distance*330/10) *10
    print(distance,duration)
    return {'distance':distance,'duration':duration,'price':price}

def get_nearest_location(latitude,longitude):
    
    latitude = round(latitude,5)
    longitude = round(longitude,5)
    RADIUS = 6371 # Earth's radius in km
    distance_rad = 6300 # Approximately 4 miles in distance

    #first-cut bounding box (in degrees)
    maxLat = round(latitude + math.radians(distance_rad/RADIUS),5)
    minLat = round(latitude - math.radians(distance_rad/RADIUS),5)
    maxLon = round(longitude + math.radians(math.asin(distance_rad/RADIUS) / math.cos(math.radians(latitude))),4);
    minLon = round(longitude - math.radians(math.asin(distance_rad/RADIUS) / math.cos(math.radians(latitude))),4);

    return {'max_lat':maxLat,'min_lat':minLat,'max_lon':maxLon,'min_lon':minLon}
# except Exception as e:
    #     return {'max_lat':None,'min_lat':None,'max_lon':None,'min_lon':None}

# x = get_nearest_location(6.69551182,3.51168203)

# print(x)