from celery import shared_task
from datetime import datetime

@shared_task
def test_task():
    print("Scheduler running:", datetime.now())