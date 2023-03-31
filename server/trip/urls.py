from django.urls import path
from .views import (CreateOrderView,ListNearbyDrivers,update_coordinates,
                    UpdateLocation,GetAddress,GetUserRoute,DriverNotificationView)

urlpatterns = [
    path('create',CreateOrderView.as_view(),name='create-order'),
    path('create-notification',CreateOrderView.as_view(),name='create-notification'),
    path('get-notification',DriverNotificationView.as_view(),name='get-notification'),
    path('loc',update_coordinates,name='get-loc'),
    path('test',ListNearbyDrivers.as_view(),name='test'),
    path('location',UpdateLocation.as_view(),name='location'),
    path('get-address',GetAddress.as_view(),name='get-address'),
    path('get-route',GetUserRoute.as_view(),name='get-route'),
]
