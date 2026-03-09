#!/bin/sh

# Start Django server
python manage.py migrate
python manage.py migrate django_celery_beat
python manage.py runserver 0.0.0.0:8000