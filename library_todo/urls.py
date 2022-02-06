"""library_gb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from todoapp.views import ProjectModelViewSet, TODOModelViewSet
from userapp.views import UserModelViewSet, UserModelWithStaffSerializer
from rest_framework.authtoken import views

router = DefaultRouter()
router.register("modified_users", UserModelViewSet)
router.register("modified_projects", ProjectModelViewSet)
router.register("modified_todo", TODOModelViewSet)
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),
    # path("viewsets/", include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    path("api/v<int:version>/users", UserModelViewSet.as_view({'get': 'list'}))
]
