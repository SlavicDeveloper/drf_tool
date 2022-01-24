from django.db.migrations import serializer
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .models import User
from .serializers import UserModelSerializer
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import action


class UserModelViewSet(viewsets.ViewSet):
    renderer_classes = [JSONRenderer]

    @action(detail=True, methods=['get'])
    def one_user_only(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        return Response({"user.first_name": user.first_name, "user.last_name": user.last_name, "user_email":user.email})

    def list(self, request):
        queryset = User.objects.all()
        serializer_class = UserModelSerializer(queryset, many=True)
        return Response(serializer_class.data)


