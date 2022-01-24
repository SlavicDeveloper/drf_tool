from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Project
from .models import TODO

from .serializers import ProjectModelSerializer
from .serializers import TODOModelSerializer

from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter


class ProjectLimitOffSetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffSetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffSetPagination
    filter_class = ProjectFilter


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TODOLimitOffSetPagination
    filterset_fields = ['project_name', 'text', 'creation_date', 'update_date',
                        'users_checklist_author', 'status']

    def destroy(self, request, pk=None):
        try:
            elem = self.get_object()
            elem.status = False
            elem.save()
        except:
            return Response(status="404_not_found")
        else:
            return Response(status="404_not_found")
