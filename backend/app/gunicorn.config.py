"""Gunicorn configuration."""

bind = "127.0.0.1:8004"

workers = 1
worker_class = "gevent"

accesslog = "-"
errorlog = "-"
loglevel = "debug"
