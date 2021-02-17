# serializers.py
from rest_framework import serializers

from .models import Hero, Group, GroupMember

class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hero
        fields = ('name', 'alias')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    group_members = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = Group
        fields = ('name', 'id', 'group_members')

class GroupMemberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GroupMember
        fields = ('name', 'id', "group_id")