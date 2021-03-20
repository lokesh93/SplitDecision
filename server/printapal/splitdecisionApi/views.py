# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.views import View

# Create your views here.
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from .serializers import HeroSerializer, GroupSerializer, GroupMemberSerializer, CreateGroupSerializer, DebtItemSerializer, DebtObligationSerializer
from .models import Hero, Group, GroupMember, DebtItem, DebtObligation
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

class DebtItemViewSet(viewsets.ModelViewSet):
    queryset = DebtItem.objects.all().order_by('name')
    serializer_class = DebtItemSerializer

    # def create(self, request):
    #     # print(request.data)
    #     serializer = self.serializer_class(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return HttpResponse("yesss")
    #     else:
    #         print(serializer.errors)
    #         return HttpResponse("no") 

class DebtObligationViewSet(viewsets.ModelViewSet):
    queryset = DebtObligation.objects.all().order_by('debt_item_id')
    serializer_class = DebtObligationSerializer
    


class DebtItemView(View):
    serializer_class = DebtItemSerializer

    def get(self, request):
        debt_obj = DebtItem.objects.get(name="hotel room 2")
        serializer = DebtItemSerializer(debt_obj)
        print(debt_obj.debt_obligations.all())
        print(serializer.data)
        json = JSONRenderer().render(serializer.data)
        return HttpResponse(json)

    def post(self, request):
        stream = StringIO(request.body)
        data = JSONParser().parse(stream)
        serializer = self.serializer_class(data=data)  
        print(data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse("yesss")
        else:
            return HttpResponse("no")




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
        print(data)
        if serializer.is_valid():
            serializer.save()
            json = JSONRenderer().render(serializer.data)
            return HttpResponse(json)
        else:
            return HttpResponse("no")

