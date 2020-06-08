from django.shortcuts import render
from django.views.generic.base import TemplateView


class Vote(TemplateView):
    template_name = 'ballot/vote.html'
