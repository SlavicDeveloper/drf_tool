from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter
from .models import TODO, Project
from .serializers import ProjectModelSerializer, TODOModelSerializer

from rest_framework import viewsets, permissions


class ProjectLimitOffSetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffSetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffSetPagination
    filter_class = ProjectFilter


class TODOModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TODOLimitOffSetPagination
    filterset_fields = ["project_name", "text", "creation_date", "update_date", "users_checklist_author", "status"]

    def destroy(self, request, pk=None):
        try:
            elem = self.get_object()
            elem.status = False
            elem.save()
        except:
            return Response(status="404_not_found")
        else:
            return Response(status="404_not_found")

