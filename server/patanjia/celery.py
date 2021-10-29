from __future__ import absolute_import, unicode_literals

import os

from celery import Celery
from kombu import Queue, Exchange

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'patanjia.settings')

BASE_REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379/3')


app = Celery('patanjia')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.broker_url = BASE_REDIS_URL

# configure task queues
app.conf.task_queues = (
    # Queue('queue_name', Exchange('queue_name'), routing_key='queue_name')
    # refer to https://docs.celeryproject.org/en/stable/userguide/routing.html
    Queue('patanjia', Exchange('patanjia', type='direct'),
          routing_key='patanjia'),
)

# celery -A patanjia worker -l info -n patanjia -Q patanjia                    ==== START CELERY IN LINUX
# celery -A patanjia worker -l info --pool=solo -n patanjia -Q patanjia       ==== START CELERY IN WINDOWS
