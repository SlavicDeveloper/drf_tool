from django.db import models

from userapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=64, blank=True)
    users = models.ManyToManyField(User)
    git_repo = models.URLField(blank=True)


class TODO(models.Model):
    project_name = models.ForeignKey(Project, on_delete=models.CASCADE, null=True)
    text = models.TextField(blank=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    users_checklist_author = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    status = models.BooleanField(default=True)
