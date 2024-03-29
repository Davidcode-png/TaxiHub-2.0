from django.db import models
# from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractUser,User
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from cloudinary.models import CloudinaryField
from trip.utils import get_address


class CustomUser(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    phone_no = models.CharField(max_length=20,blank=True,null=True)
    is_driver = models.BooleanField('driver status',default=False)
    is_customer = models.BooleanField('customer status',default=False)

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email

class CustomerProfile(models.Model):
    RATING_CHOICES = zip(range(1,6),range(1,6))
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE,related_name='profile')
    age = models.IntegerField(blank=True,null=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=255,blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    last_location_update = models.DateTimeField(null=True, blank=True)
    rating = models.IntegerField(choices=RATING_CHOICES,blank=True,default=5)
    prof_pic = CloudinaryField('image',null=True, default=None, blank=True)

    def __str__(self) -> str:
        return f'{self.user.email}'
    
    def save(self,*args, **kwargs):
        # if self.longitude == None or self.latitude == None:
        #     updated_address = get_address(self.location)
        #     if len(updated_address) != 0:
        #         self.location = updated_address['formatted_address']
        #         self.longitude = updated_address['longitude']
        #         self.latitude = updated_address['latitude']
        super(CustomerProfile,self).save(*args, **kwargs)

class DriverProfile(models.Model):
    RATING_CHOICES = zip(range(1,6),range(1,6))
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE,related_name='driver_profile')
    age = models.IntegerField(blank=True,null=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=255,blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    last_location_update = models.DateTimeField(null=True, blank=True)
    rating = models.IntegerField(choices=RATING_CHOICES,blank=True,default=5)
    car_brand = models.CharField(max_length=80,default='',)
    car_model = models.CharField(max_length=150,default='',)
    car_plate_no = models.CharField(max_length=11,default='',)
    prof_pic = CloudinaryField('image',null=True, default=None, blank=True)

    def __str__(self) -> str:
        return f'{self.user.email}'
