import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User
from mixer.backend.django import mixer
from .views import ProjectModelViewSet, TODOModelViewSet
from .models import Project


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

    def test_project_put_mixer(self):
        project = mixer.blend(Project)
        admin = User.objects.create_superuser("admin", "admin@mail.ru", "admin123456")
        self.client.force_authenticate(admin)
        # print("#############", project.id)
        response = self.client.put(f"/api/modified_projects/{project.id}",
                                   {"name": "Bristol", "users":[1],
                                    "git_repo": "https://github.com/SlavicDeveloper/Kursovaya", "id": project.id},
                                   follow=True  # при True вылетает 200, но put запрос не проходит
                                   )  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("############### Code", response.status_code)
        # print("############### Chain", response.redirect_chain)
        project = Project.objects.get(id=project.id)
        # print("#########", project.id)
        self.assertEqual(project.name, "Bristol")
        self.client.logout()
