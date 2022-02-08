import graphene
from graphene_django import DjangoObjectType

from todoapp.models import Project, TODO
from userapp.models import User

"""Models"""


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class TodoType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = "__all__"


"""Queries"""


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(self, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
