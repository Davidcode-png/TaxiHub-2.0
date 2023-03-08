import requests
import json
from django.shortcuts import render,HttpResponse,get_object_or_404,redirect
from django.conf import settings
from django.core import serializers
from rest_framework import generics
from rest_framework.views import APIView
from user.models import DriverProfile,CustomerProfile
from user.serializers import DriverProfileSerializer
from .serializers import OrderSerializer
from .models import Order
from django.http import JsonResponse
from django.templatetags.static import static
from .utils import get_address,get_address_by_point,get_nearest_location
from rest_framework.response import Response

def get_location(request):
    return HttpResponse("<script src='{src}'></script>".format(
        src = static('js/location.js')))
    
    

class CreateOrderView(generics.CreateAPIView):
    queryset = Order
    serializer_class = OrderSerializer
    
    def post(self, request, *args, **kwargs):

        longitude = (request.COOKIES.get('longitude'))
        latitude = (request.COOKIES.get('latitude'))
        address = get_address_by_point(longitude,latitude)
        print(address)
        # return longitude,latitude,address['formatted_address']
        # Updates the passenger profile to get his/her current location
        profile = CustomerProfile.objects.get(pk=self.request.user.profile.id)

        profile.longitude,profile.latitude,profile.location = (longitude,latitude,address['formatted_address'])
        # # profile.latitude = latitude
        profile.save()
        get_location(request)
        return super().post(request, *args, **kwargs)


def getting_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')

    if x_forwarded_for:

       ip = x_forwarded_for.split(',')[0]

    else:

       ip = request.META.get('REMOTE_ADDR')

    location_data = get_ip_geolocation_data()
    longitude = str(location_data['longitude'])
    latitude = str(location_data['latitude'])
    return HttpResponse("Welcome! You are visiting from: {}, here is your longitude: {} and latitiude {}".format(ip,longitude,latitude))



def get_ip_geolocation_data():
    response = requests.get(settings.ABSTRACT_API_URL)
    response = json.loads(response.text)
    print(response)
    return(response)

class ListNearbyDrivers(generics.ListAPIView):

    queryset = DriverProfile.objects.all()
    serializer_class = DriverProfileSerializer
    def get(self,request):
        longitude = (request.COOKIES.get('longitude'))
        latitude = (request.COOKIES.get('latitude'))
        latitude = float(latitude)
        longitude = float(longitude)
        location = get_nearest_location(latitude,longitude)
        drivers = DriverProfile.objects.filter(latitude__lte = location['max_lat'],
                                                latitude__gte = location['min_lat'],
                                                longitude__lte=location['max_lon'], 
                                                longitude__gte =location['min_lon'])
        driver_serializer = DriverProfileSerializer(drivers,many=True)
        # drivers = serializers.serialize('json',drivers)
        return Response(driver_serializer.data)

def update_coordinates(request):
    """
    Runs a Javascript file that enables HTML5 Geolocation
    """
    return HttpResponse("<script src='{src}'></script>".format(
        src = static('js/location.js')))

class UpdateLocation(APIView):
    """
    User can get their location either through their position(longitude or latitude) or
    user input(address)

    get() --> Checks if the user coordinates are in the cookie and uses that

    post() --> First checks if there are no coordinates, after that it relies on the
    user's address input, running the function get_address(location) returns the 
    formatted address, longitude and latitude which would be sent to the User's Profile
    either a Driver or a Customer and updates it, Otherwise it just uses their coordinates
    """
    longitude = None
    latitude = None
    def get(self,request): 
        self.longitude = (request.COOKIES.get('longitude'))
        self.latitude = (request.COOKIES.get('latitude'))
        return Response({'longitude':self.longitude,'latitude':self.latitude})
    
    def post(self,request):
        print(self.get(request))
        if self.longitude == None and self.latitude == None:
            location = request.data.get('location')
            print(location)
            address = get_address(location)
            passenger = CustomerProfile.objects.filter(user=request.user)
            if passenger.exists():
                passenger = passenger.first()
                passenger.location = address['formatted_address']
                passenger.longitude = address['longitude']
                passenger.latitude = address['latitude']
                passenger.save()

            driver = DriverProfile.objects.filter(user=request.user)
            if driver.exists():
                driver = driver.first()
                driver.location = address['formatted_address']
                driver.longitude = address['longitude']
                driver.latitude = address['latitude']
                driver.save()
            return HttpResponse(get_address(location))
        else:
            return JsonResponse(get_address_by_point(self.longitude,self.latitude))
    