'''Use this for development'''
import os
from .base import *

ALLOWED_HOSTS += ['*']
DEBUG = True

WSGI_APPLICATION = 'app.wsgi.dev.application'
if config.DATABASE == 'AWS':
    # ENGINE = 'django.db.backends.postgresql'
    print("-------- DEV SERVER RDS DATABASE STILL SET !!! -------")
    print("-------- DEV SERVER RDS DATABASE STILL SET !!! -------")
    print("-------- DEV SERVER RDS DATABASE STILL SET !!! -------")
    # DATABASES = {
    #     'default': {
    #         'ENGINE': 'django.db.backends.sqlite3',
    #         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    #     }
    # }
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': config.NAME,
            'USER': config.USER,
            'PASSWORD': config.PASSWORD,
            'HOST': config.HOST,
            'PORT': config.PORT,
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

# GRAPHENE
CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
