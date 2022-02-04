from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from django.contrib.auth.models import User
from .views import UserModelViewSet


# Create your tests here.

class TestUserModelViewSet(TestCase):  # OK, пользователи получены
    def test_get_user_list(self):
        factory = APIRequestFactory()
        request = factory.get('http://127.0.0.1:8000/api/modified_users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):  # OK, пользователь не авторизирован
        factory = APIRequestFactory()
        request = factory.post("http://127.0.0.1:8000/api/modified_users/",
                               {"first_name": "David", "last_name": "Livsey",
                                "email": "livsey@mail.ru", "birthday_year": 1799}, format="json")

        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):  # OK, создан пользователь с правами администратора
        factory = APIRequestFactory()
        request = factory.post("http://127.0.0.1:8000/api/modified_users/",
                               {"first_name": "David", "last_name": "Livsey", "birthday_year": 1799,
                                "email": "livsey@mail.ru"}, format="json")
        admin = User.objects.create_superuser('admin3', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
