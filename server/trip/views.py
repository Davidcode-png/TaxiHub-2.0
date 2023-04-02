from django.shortcuts import render,HttpResponse,get_object_or_404,redirect
from django.conf import settings
from django.core import serializers
from django.http import JsonResponse
from django.templatetags.static import static

from rest_framework import generics
from rest_framework import status as Status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


from .serializers import OrderSerializer,NotificationSerializer
from .models import Order,Notification
from user.models import DriverProfile,CustomerProfile
from user.serializers import DriverProfileSerializer

from .utils import get_address,get_address_by_point,get_nearest_location,get_route

class CreateOrderView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
class CreateNotificationView(generics.CreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
    def perform_create(self, serializer):
        serializer.save()

    # def perform_create(self, serializer):
    #     serializer.save()
    #     # return super().perform_create(serializer)

class TestCreateNotificationView(APIView):
    # queryset = Notification.objects.all()
    # serializer_class = NotificationSerializer

    # def perform_create(self, serializer):
    #     notification = serializer.save()
    #     channel_layer = get_channel_layer()
    #     async_to_sync(channel_layer.group_send)(
    #         f"user-{notification.user_to}",
    #         {
    #             "type": "send_notification",
    #             "message": serializer.data
    #         }
    #     )
    def post(self,request):
        user_from = request.data.get('user_from')
        user_to = request.data.get('user_to')
        status  = request.data.get('status')
        source  = request.data.get ('source')
        destination  = request.data.get ('destination')
        fare  = request.data.get ('fare')
        distance  = request.data.get ('distance')
        payment_options  = request.data.get ('payment_options')
        notification = Notification.objects.create(
            user_from=CustomerProfile.objects.get(id=user_from),
            user_to=DriverProfile.objects.get(id=user_to),
            status=status,
            source=source,destination=destination,fare=fare,distance=distance,
            payment_options=payment_options,
        )
        channel_layer = get_channel_layer()
        group_name = f"driver-{user_to}"
        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                "type": "notify",
                "notification_id": notification.id,
                "message": f"Sent notification from {user_from} to {user_to}"
            }
        )
        
        return Response(status=Status.HTTP_201_CREATED)
        

class DriverNotificationView(generics.ListAPIView):

    permission_classes = [IsAuthenticated,]
    # authentication_classes = [TokenAuthentication]
    serializer_class = NotificationSerializer
    
    # Gets the query set of the authenticated user
    def get_queryset(self):

        user = self.request.user
        print(self.request)
        return Notification.objects.filter(user_to=DriverProfile.objects.get(user=self.request.user))
    
    # Did this to bypass the lookup field in the url
    def get_object(self):
        queryset = self.get_queryset()
        # print("User Queryset is: ",queryset.__dict__)
        obj = queryset.filter(user_to=DriverProfile.objects.get(user=self.request.user))
        # obj = Notification.objects.filter(user_to=Driver)
        return obj






class ListNearbyDrivers(generics.ListAPIView):
    """
    Gets the driver near to the order request that the passenger made
    """
    queryset = DriverProfile.objects.all()
    serializer_class = DriverProfileSerializer

    longitude = None
    latitude = None
    # def get(self,request):
        
    #     # Gets the user location
    #     longitude = (request.COOKIES.get('longitude'))
    #     latitude = (request.COOKIES.get('latitude'))
    #     if longitude == None and latitude == None:
    #         passenger = CustomerProfile.objects.get(user=request.user)
    #         latitude = passenger.latitude
    #         longitude = passenger.longitude
        
    #     #Converting the value from a string to a float for database queries
    #     latitude = float(latitude)
    #     longitude = float(longitude)
    #     location = get_nearest_location(latitude,longitude)
    #     drivers = DriverProfile.objects.filter(latitude__lte = location['max_lat'],
    #                                             latitude__gte = location['min_lat'],
    #                                             longitude__lte=location['max_lon'], 
    #                                             longitude__gte =location['min_lon'])
    #     driver_serializer = DriverProfileSerializer(drivers,many=True)
    #     # drivers = serializers.serialize('json',drivers)
    #     return Response(driver_serializer.data)
    
    def post(self,request):
        
        # Gets the user location
        print("This is the request body though",request.body)
        print()
        self.longitude = request.data.get('longitude')
        self.latitude = request.data.get('latitude')
        print("Hey dude this is the longitude",self.longitude)
        print()
        # if longitude == None and latitude == None:
        #     passenger = CustomerProfile.objects.get(user=request.user)
        #     latitude = passenger.latitude
        #     longitude = passenger.longitude
        
        #Converting the value from a string to a float for database queries
        self.latitude = float(self.latitude)
        self.longitude = float(self.longitude)
        location = get_nearest_location(self.latitude,self.longitude)
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


class GetAddress(APIView):
    """
    Gets the address a point using the longitude and the latitude
    """
    longitude = None
    latitude = None

    def post(self,request):
        self.longitude = request.data.get('longitude')
        self.latitude = request.data.get('latitude')
        return Response(get_address_by_point(self.longitude,self.latitude))

class GetUserRoute(APIView):
    """
    Gets the address a point using the longitude and the latitude
    """
    source_longitude = None
    source_latitude = None
    dest_longitude = None
    dest_latitude = None

    def post(self,request):
        self.source_longitude = request.data.get('source_longitude')
        self.source_latitude = request.data.get('source_latitude')
        self.dest_longitude = request.data.get('dest_longitude')
        self.dest_latitude = request.data.get('dest_latitude')
        return Response(get_route(self.source_latitude,self.source_longitude,
                                            self.dest_latitude,self.dest_longitude))

# class GetUserRoute(APIView):

#     def get(self,request):
#         return Response(get_route())

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
    