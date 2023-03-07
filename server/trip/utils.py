import requests
import django
# from server import settings
# from server.server import settings
import json
from django.conf import settings
import pprint

BING_MAPS_API_KEY='AhfV0yUHnmLCKnbE4FXNfi4GjwHJndYSz7qGRzWGIejk-_ea4RqQuKjZoE8dwTQq'



def get_address(address):
    response = requests.get(f'http://dev.virtualearth.net/REST/v1/Locations?locality={address}&adminDistrict=NG&key={settings.BING_MAPS_API_KEY}')
    print(f'http://dev.virtualearth.net/REST/v1/Locations?locality={address}&adminDistrict=NG&key={settings.BING_MAPS_API_KEY}')
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
        print(data)
        return data
        
    except IndexError as e:
        # print('Location Not Found')
        return {}
get_address('Kadesh Nigeria')

def get_address_by_point(longitude,latitude):
    response = requests.get(f'https://dev.virtualearth.net/REST/v1/Locations/{latitude},{longitude}?&key={BING_MAPS_API_KEY}') 
    print(f'https://dev.virtualearth.net/REST/v1/Locations/{latitude},{longitude}?&key={BING_MAPS_API_KEY}') 
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
        locality = address['locality']
        latitude = coordinates[0]
        longitude = coordinates[1]
        actual_address = locality + ', ' + admin_district + ', ' + country
        data = {'formatted_address':actual_address,'longitude':longitude,'latitude':latitude}
        # print(json.dumps(resource,indent=1))
        print(data)
        return data
        
    except IndexError as e:
        # print('Location Not Found')
        return {}