# serializers.py
from rest_framework import serializers

from .models import Hero, Group, GroupMember, DebtItem, DebtObligation

class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ('name', 'alias')




class GroupMemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = GroupMember
        fields = ('name', 'id', "group_id")


class DebtObligationSerializer(serializers.ModelSerializer):

    # creditor = serializers.StringRelatedField()
    # debtor = serializers.StringRelatedField()

    
    creditor = GroupMemberSerializer()
    debtor =  GroupMemberSerializer()
    depth = 4

    class Meta:
        model = DebtObligation
        fields = ("creditor", "debtor", "amount", "debt_item_id","id")
        read_only_fields = ("debt_item_id", "id")



class DebtItemSerializer(serializers.ModelSerializer):

    debt_obligations = DebtObligationSerializer(many=True)
    group_id = serializers.CharField()

    class Meta:
        model = DebtItem
        fields = ("name", "amount", "group_id", "debt_obligations", "id")
        depth = 4
        # read_only_fields = ("id", )

    def create(self, validated_data):
        debt_obligations = validated_data.pop('debt_obligations')
        print(validated_data)
        name = validated_data["name"]
        amount_total = validated_data["amount"]
        group_id = validated_data["group_id"]
        # print(group_id.id)
        group = Group.objects.get(id=group_id)
        debt_item_instance = DebtItem.objects.create(name=name, amount=amount_total, group_id=group)

        for debt_obligation_obj in debt_obligations:
            creditor_name = debt_obligation_obj["creditor"]["name"]
            debtor_name = debt_obligation_obj["debtor"]["name"]
            print(creditor_name)
            amount = debt_obligation_obj["amount"]
            

            creditor = GroupMember.objects.get(name=creditor_name, group_id=group_id)
            debtor = GroupMember.objects.get(name=debtor_name, group_id=group_id)

            DebtObligation.objects.create(debtor=debtor, creditor=creditor, amount=amount, debt_item_id=debt_item_instance) 

        return debt_item_instance

    def update(self, instance, validated_data):
        print(instance)
        print(validated_data)

        instance.amount = validated_data.get('amount', instance.amount)
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        debt_obligations_data = validated_data.pop("debt_obligations")

        debt_obligations_arr = DebtObligation.objects.filter(debt_item_id=instance)

        print(debt_obligations_arr)

        for index, debt_obligations_obj in enumerate(debt_obligations_arr, start=0):
            creditor_name = debt_obligations_data[index]["creditor"]["name"]
            creditor = GroupMember.objects.get(name=creditor_name, group_id=instance.group_id)

            debtor_name = debt_obligations_data[index]["debtor"]["name"]
            debtor = GroupMember.objects.get(name=debtor_name, group_id=instance.group_id)

            debt_obligations_obj.creditor = creditor
            debt_obligations_obj.debtor = debtor

            debt_obligations_obj.amount = debt_obligations_data[index]["amount"]

            debt_obligations_obj.save()
            

        return instance



class GroupSerializer(serializers.ModelSerializer):
    group_members = GroupMemberSerializer(many=True)
    debt_items = DebtItemSerializer(many=True)
    depth = 3
    
    class Meta:
        model = Group
        fields = ('name', 'id', 'group_members', "debt_items")



class CreateGroupSerializer(serializers.ModelSerializer):

    class CreateGroupMemberSerializer(serializers.ModelSerializer):
        class Meta:
            model = GroupMember
            fields = ('name', 'id')


    group_members = CreateGroupMemberSerializer(many=True)
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


# class DebtItemSerializer(serializers.ModelSerializer):

#     class DebtObligationSerializer(serializers.ModelSerializer):

#         class DebtorCreditorSerializer(serializers.ModelSerializer):

#             class Meta:
#                 model = GroupMember
#                 fields = ('name', 'id')

#         creditor = DebtorCreditorSerializer()
#         debtor = DebtorCreditorSerializer()
#         # creditor = GroupMemberSerializer()
#         # debtor = GroupMemberSerializer()


#         class Meta:
#             model = DebtObligation
#             fields = ("debtor", "creditor", "amount")

#     debt_obligations = DebtObligationSerializer(many=True)

#     class Meta:
#         model = DebtItem
#         fields = ("name", "amount", "debt_obligations", "group_id")

#     def create(self, validated_data):
#         debt_obligations_data = validated_data.pop('debt_obligations')
#         debt_item_instance = DebtItem.objects.create(**validated_data)
#         group_id = validated_data.pop('group_id')
#         print(group_id)

#         for debt_obligation_obj in debt_obligations_data:
#             print(debt_obligation_obj)
#             creditor_name = debt_obligation_obj["creditor"]["name"]
#             debtor_name = debt_obligation_obj["debtor"]["name"]
#             print(creditor_name)
#             amount = debt_obligation_obj["amount"]
            

#             creditor = GroupMember.objects.get(name=creditor_name, group_id=group_id)
#             debtor = GroupMember.objects.get(name=debtor_name, group_id=group_id)

#             DebtObligation.objects.create(debtor=debtor, creditor=creditor, amount=amount, debt_item_id=debt_item_instance) 

#         return debt_item_instance
