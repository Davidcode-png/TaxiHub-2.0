import requests
import json
from django.shortcuts import render,HttpResponse,get_object_or_404
from django.http import JsonResponse
from django.conf import settings
from rest_framework import generics
from user.models import DriverProfile,CustomerProfile
from .serializers import OrderSerializer
from .models import Order
from django.templatetags.static import static

class CreateOrderView(generics.CreateAPIView):
    queryset = Order
    serializer_class = OrderSerializer

    # def get_object(self):
    #     queryset = self.get_queryset()
    #     obj = Order.objects.filter(passenger=self.request.user.profile).first()
    #     return obj
    
    def post(self, request, *args, **kwargs):
        x = HttpResponse("<script src='{src}'></script>".format(
        src = static('js/location.js')))
        print(request.COOKIES.get('longitude'))
        print(request.COOKIES.get('latitude'))
        longitude = (request.COOKIES.get('longitude'))
        latitude = (request.COOKIES.get('latitude'))
        
        # Updates the passenger profile to what his current location
        profile = CustomerProfile.objects.get(pk=self.request.user.profile.id)
        profile.longitude = longitude
        profile.latitude = latitude
        profile.save()
        # self.get_queryset().passenger.latitude = latitude
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


def get_location(request):
    x = HttpResponse("<script src='{src}'></script>".format(
        src = static('js/location.js')))
    # test  = HttpResponse.request.POST['data']
    # print(request.META.get('HTTP_COOKIE'))
    print(request.COOKIES.get('longitude'))
    print(request.COOKIES.get('latitude'))
    return x