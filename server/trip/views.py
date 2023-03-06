from django.shortcuts import render,HttpResponse
from rest_framework import generics
from user.models import DriverProfile,CustomerProfile
from .serializers import OrderSerializer
from .models import Order

class CreateOrderView(generics.CreateAPIView):
    queryset = Order
    serializer_class = OrderSerializer


