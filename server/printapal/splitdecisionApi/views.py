# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.views import View

# Create your views here.
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from .serializers import HeroSerializer, GroupSerializer, GroupMemberSerializer, CreateGroupSerializer
from .models import Hero, Group, GroupMember
from StringIO import StringIO


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


# class GroupRoom(View):




class GroupCreateView(View):
    serializer_class = CreateGroupSerializer


    def get(self, request, *args, **kwargs):
        id = kwargs['id']
        group_obj = Group.objects.get(name="test group 5")
        serializer = CreateGroupSerializer(group_obj)
        print(group_obj.group_members.all())
        print(serializer.data)
        json = JSONRenderer().render(serializer.data)
        return HttpResponse(json)



    def post(self, request):
        # create stream object and deserialize
        stream = StringIO(request.body)
        data = JSONParser().parse(stream)   
        serializer = self.serializer_class(data=data)     
        print(data['name'])
        if serializer.is_valid():
            serializer.save()
            # group = Group(name=data["name"])
            # group.save()
            return HttpResponse("yesss")
        else:
            return HttpResponse("no")

