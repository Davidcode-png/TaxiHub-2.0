from rest_framework import serializers
from .models import Order,Notification


class OrderSerializer(serializers.ModelSerializer):
    # source = serializers.SerializerMethodField()

    class Meta:
        fields = ('passenger','driver','source','destination','fare','distance','payment_options')
        model = Order

class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('user_from','user_to','status','source','destination','fare','distance','payment_options')
        model = Notification

    
    # def get_source(self,obj):
    #     source = obj.passenger.location
    #     return source
