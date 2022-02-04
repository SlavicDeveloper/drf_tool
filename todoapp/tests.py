import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient, APITestCase, force_authenticate
from django.contrib.auth.models import User
from .views import ProjectModelViewSet, TODOModelViewSet
from .models import Project, TODO


# Create your tests here.

class TestProjectsAndTodosViewsets(TestCase):  # OK, пользователь не авторизован
    def test_get_project(self):
        client = APIClient()
        response = client.get("http://127.0.0.1:8000/api/modified_projects/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_project_auth(self):  # OK, пользователь авторизирован, и проекты получены
        client = APIClient()
        admin = User.objects.create_superuser("admin", "admin@mail.ru", "admin123456")
        client.force_authenticate(admin)
        response = client.get("http://127.0.0.1:8000/api/modified_projects/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()


class TestTodoModelViewSet(APITestCase):  # OK, пользователь авторизирован
    def test_get_todos(self):
        admin = User.objects.create_superuser("admin", "admin@mail.ru", "admin123456")
        self.client.force_authenticate(admin)
        response = self.client.get("http://127.0.0.1:8000/api/modified_todo/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()
