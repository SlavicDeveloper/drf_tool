from rest_framework.viewsets import ModelViewSet

from .models import Project
from .models import TODO

from .serializers import ProjectModelSerializer
from .serializers import TODOModelSerializer

from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter


class ProjectPageNumberPagination(LimitOffsetPagination):
    default_limit = 10

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPageNumberPagination
    filter_class = ProjectFilter

class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
