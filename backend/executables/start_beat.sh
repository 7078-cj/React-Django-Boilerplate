#!/bin/sh

# Start Django server
python manage.py migrate
python manage.py migrate django_celery_beat
celery -A backend beat --loglevel=info