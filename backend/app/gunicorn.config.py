"""Gunicorn configuration."""

bind = '127.0.0.1:8000'

workers = 4
worker_class = 'gevent'

accesslog = '/home/ubuntu/log/gunicorn-access.log'
errorlog = '/home/ubuntu/log/gunicorn-error.log'
loglevel = 'debug'
