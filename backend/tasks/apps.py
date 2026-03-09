from django.apps import AppConfig
from .tasks import test_task


class TasksConfig(AppConfig):
    name = 'tasks'
    
    def ready(self):
        test_task.delay()
