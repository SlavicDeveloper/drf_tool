from .models import User
from .serializers import UserModelSerializer, UserModelWithStaffSerializer
from rest_framework.viewsets import ModelViewSet


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 2:
            return UserModelWithStaffSerializer
        else:
            return UserModelSerializer
