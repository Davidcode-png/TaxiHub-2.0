from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Notification
import json
from user.models import DriverProfile
# class NotificationConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()
#         await self.update_message_count()

#     async def disconnect(self, close_code):
#         pass

#     async def receive(self, text_data):
#         pass

#     async def update_message_count(self):
#         message_count = await self.get_message_count()
#         await self.send(text_data=json.dumps({'message_count': message_count}))

#     @database_sync_to_async
#     def get_message_count(self):
#         return Notification.objects.filter(is_read=False).count()

# @receiver(post_save, sender=Notification)
# def notification_saved(sender, instance, **kwargs):
#     notification_consumer = NotificationConsumer()
#     sync_to_async(notification_consumer.update_message_count)()


class MyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("Guesssing it workerd")
        print()
        await self.channel_layer.group_add('my-group', self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('my-group', self.channel_name)

    async def receive(self, text_data):
        message = json.loads(text_data)
        await self.channel_layer.group_send('my-group', {
            'type': 'send_message',
            'message': message,
        })

    async def send_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))


class DriverNotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        driver_id = self.scope['url_route']['kwargs']['driver_id']
        self.group_name = f"driver-{driver_id}"
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
            )
        await self.accept()
    

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        message = json.loads(text_data)
        if message['type'] == 'join':
            # Notify the driver that they have joined the group
            await self.send(text_data=json.dumps({
                'type': 'notify',
                'message': await (self.get_notif())
            }))
        else:
            # Ignore any other message types
            pass
    
    @database_sync_to_async
    def get_notif(self):
         return Notification.objects.filter(user_to=6).count()

    async def notify(self, event):
        notification_id = event['notification_id']
        message = event['message']
        await self.send(text_data=json.dumps({
            'type': 'notify',
            'notification_id': notification_id,
            'message': await self.get_notif()
        }))