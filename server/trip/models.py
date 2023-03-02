from django.db import models

from django.contrib.auth import get_user_model
from user.models import DriverProfile,CustomerProfile
User = get_user_model()

PAYMENT_OPTIONS = (
        ('Cash','Cash'),
        ('Wallet','Wallet'),
        ('Transfer','Transfer'),
    )
class Order(models.Model):
    
    passenger = models.ForeignKey(CustomerProfile,on_delete=models.CASCADE,related_name='passenger')
    driver = models.ManyToManyField(DriverProfile,related_name='drivers',blank=True)
    source = models.CharField(max_length=300,blank=True)
    destination = models.CharField(max_length=300,blank=True)
    is_accepted = models.BooleanField(default=False)
    payment_options = models.CharField(max_length=20,choices=PAYMENT_OPTIONS,blank=True)

class ProposedOrder(models.Model):
    driver = models.ForeignKey(DriverProfile,on_delete=models.SET_NULL,related_name='proposed_driver',blank=True,null=True)    
    passenger = models.ForeignKey(CustomerProfile,on_delete=models.CASCADE,related_name='proposed_passenger')
    source = models.CharField(max_length=300,blank=True)
    destination = models.CharField(max_length=300,blank=True)
    fare = models.CharField(max_length=6,blank=True)
    distance = models.CharField(max_length=10)
    is_accepted = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)
    has_arrived = models.BooleanField(default=False)
    payment_options = models.CharField(max_length=20,choices=PAYMENT_OPTIONS,blank=True)

class FinalOrder(models.Model):
    PAYMENT_OPTIONS = (
        ('Cash','Cash'),
        ('Wallet','Wallet'),
        ('Transfer','Transfer'),
    )
    passenger = models.ForeignKey(CustomerProfile,on_delete=models.CASCADE,related_name='final_passenger')
    driver = models.ForeignKey(DriverProfile,on_delete=models.SET_NULL,related_name='final_driver',blank=True,null=True)
    source = models.CharField(max_length=300,blank=True)
    destination = models.CharField(max_length=300,blank=True)
    fare = models.CharField(max_length=6,blank=True)
    distance = models.CharField(max_length=10)
    approx_time = models.CharField(max_length=15)
    is_accepted = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)
    has_arrived = models.BooleanField(default=False)
    payment_options = models.CharField(max_length=20,choices=PAYMENT_OPTIONS,blank=True)