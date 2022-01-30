from django.db import models

from userapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=64, blank=True)
    users = models.ManyToManyField(User)
    git_repo = models.URLField(blank=True)


class TODO(models.Model):
    project_name = models.ForeignKey(Project, on_delete=models.CASCADE)  # сносим заметку при удалении проекта
    text = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    users_checklist_author = models.ForeignKey(User, on_delete=models.PROTECT)  # запрет на удаление пользователя
    status = models.BooleanField(default=True)
