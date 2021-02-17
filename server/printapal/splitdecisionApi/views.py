# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
from rest_framework import viewsets

from .serializers import HeroSerializer, GroupSerializer, GroupMemberSerializer
from .models import Hero, Group, GroupMember

def index(request):
    return HttpResponse("<h1>MyClub Event Calendar</h1>")


class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all().order_by('name')
    serializer_class = HeroSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer

class GroupMemberViewSet(viewsets.ModelViewSet):
    queryset = GroupMember.objects.all().order_by('name')
    serializer_class = GroupMemberSerializer
