from django.db import models
from django.contrib.auth import get_user_model
from user.models import DriverProfile,CustomerProfile
User = get_user_model()

PAYMENT_OPTIONS = (
        ('Cash','Cash'),
        ('Wallet','Wallet'),
        ('Transfer','Transfer'),
    )

STATUS = (
    ('sent','sent'),
    ('created','created'),
    ('accepted','accepted'),
    ('finished','finished'),
    ('cancelled','cancelled'),
)
class Order(models.Model):
    
    passenger = models.ForeignKey(CustomerProfile,on_delete=models.CASCADE,related_name='passenger')
    driver = models.ForeignKey(DriverProfile,related_name='drivers',blank=True,on_delete=models.DO_NOTHING,null=True)
    status = models.CharField(max_length=40,choices=STATUS,default='created',blank=True,null=True)
    source = models.CharField(max_length=300,blank=True)
    destination = models.CharField(max_length=300,blank=True)
    fare = models.CharField(max_length=6,blank=True)
    distance = models.CharField(max_length=10,blank=True,null=True)
    payment_options = models.CharField(max_length=20,choices=PAYMENT_OPTIONS,blank=True)

    def __str__(self) -> str:
        return f'{self.passenger.user.first_name}\'s trip from {self.source} to {self.destination}'
    

    def save(self,*args, **kwargs):
        # passenger = CustomerProfile.objects.get(pk = self.passenger.id)
        # print(passenger)
        # self.source = self.passenger.location
        super(Order,self).save(*args, **kwargs)




class Notification(models.Model):
    user_from = models.ForeignKey(CustomerProfile,on_delete=models.CASCADE,related_name='passengernotif')
    user_to = models.ForeignKey(DriverProfile,on_delete=models.CASCADE,related_name='drivernotif',null=True)
    status = models.CharField(max_length=40,choices=STATUS,default='created',blank=True,null=True)
    source = models.CharField(max_length=300,blank=True)
    destination = models.CharField(max_length=300,blank=True)
    fare = models.CharField(max_length=6,blank=True)
    distance = models.CharField(max_length=10,blank=True,null=True)
    payment_options = models.CharField(max_length=20,choices=PAYMENT_OPTIONS,blank=True)

    def __str__(self) -> str:
        return f'{self.user_from.user.first_name} to {self.user_to.user.first_name}'
    