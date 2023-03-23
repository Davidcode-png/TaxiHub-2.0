from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    # source = serializers.SerializerMethodField()

    class Meta:
        fields = ('passenger','driver','source','destination','fare','distance','payment_options')
        model = Order

    
    # def get_source(self,obj):
    #     source = obj.passenger.location
    #     return source
