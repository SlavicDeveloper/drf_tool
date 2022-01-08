from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=64, blank=False)
    last_name = models.CharField(max_length=64, blank=False)
    birthday_year = models.PositiveIntegerField()
    email = models.EmailField(unique=True, blank=False)
