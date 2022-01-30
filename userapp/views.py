from rest_framework import mixins, viewsets
from .serializers import UserModelSerializer
from .models import User


class UserModelViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()


