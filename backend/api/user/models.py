from django.db import models

class Test(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.TextField(default="set a description")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name