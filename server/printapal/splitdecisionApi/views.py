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
from io import StringIO, BytesIO
import requests


def index(request):
    # return HttpResponse("<h1>MyClub Event Calendar</h1>")
    return render(request, "index.html")

def index(request):
    # return HttpResponse("<h1>MyClub Event Calendar</h1>")
    return render(request, "index.html")


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
        stream = BytesIO(request.body)
        data = JSONParser().parse(stream)   
        serializer = self.serializer_class(data=data)     
        print(data)
        if serializer.is_valid():
            serializer.save()
            json = JSONRenderer().render(serializer.data)
            return HttpResponse(json)
        else:
            return HttpResponse("no")


class PageView(View):

    def get(self, request):
        r = requests.get(url="https://qa5.shoplogix.com/Web/Api/Export/CurrentJob", auth=('administrator', 'YMe.?xepZA'))
        print(r.status_code)
        print(r.json())
        return HttpResponse( JSONRenderer().render(r.json()) )

    def post(self, request):
        stream = BytesIO(request.body)
        data = JSONParser().parse(stream)
        print(data)
        r = requests.post(url="https://qa5.shoplogix.com/web/api/msg/machines/51CB0F18-05E0-40F1-A98F-AD1803A92C0B/?1.16.18",data=request.body, auth=('administrator', 'YMe.?xepZA'))
        print(r.status_code)
        # print(r.errors)

        return HttpResponse("yes paged")   



    