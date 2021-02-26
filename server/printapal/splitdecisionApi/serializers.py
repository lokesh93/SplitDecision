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

class CreateGroupSerializer(serializers.ModelSerializer):


    class CreateGroupMemberSerializer(serializers.ModelSerializer):
        class Meta:
            model = GroupMember
            fields = ('name', 'id')


    group_members = CreateGroupMemberSerializer(many=True, read_only=True)
    # group_members = serializers.ListField(child=CreateGroupMemberSerializer())
    # group_members = serializers.StringRelatedField(many=True)

    class Meta:
        model = Group
        fields = ('id','name', 'group_members')

    def create(self, validated_data):
        group_member_data = validated_data.pop('group_members')
        group_instance = Group.objects.create(**validated_data)

        for group_member_obj in group_member_data:
            GroupMember.objects.create(name=group_member_obj["name"], group_id=group_instance)

        return group_instance
