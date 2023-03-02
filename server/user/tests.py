from django.urls import reverse
from rest_framework.test import APITestCase,APIRequestFactory
from .views import CustomerProfileView
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterTestCase(APITestCase):

    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.view = CustomerProfileView
        self.url = reverse('customer-profile')
        self.user = User.objects.create(
            username = 'TheSims4',
            email = 'lolol@gmail.com',
            password = '54321epo',
            phone_no = '290123029302',
            is_driver = False,
            is_customer = True,
        )
    # def test_registration(self):
    #     request = self.factory.get(self.url)
    #     response = self.view(request)
    #     print(response)
