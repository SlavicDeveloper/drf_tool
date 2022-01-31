from .models import User
from .serializers import UserModelSerializer
from rest_framework.viewsets import ModelViewSet


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
