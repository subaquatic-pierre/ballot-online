from django.urls import path
from . import views

app_name = 'ballot'

urlpatterns = [
    path('', views.Vote.as_view(), name='vote')
]
