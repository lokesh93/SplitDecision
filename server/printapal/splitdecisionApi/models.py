# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import uuid
from django.db import models

# Create your models here.
class Hero(models.Model):
    name = models.CharField(max_length=60)
    alias = models.CharField(max_length=60)
        
    def __str__(self):
        return self.name

class Group(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=60)
        
    def __str__(self):
        return self.name

class GroupMember(models.Model):
    name = models.CharField(max_length=60)
    group_id = models.ForeignKey(
        Group,
        related_name='group_members',
        on_delete=models.CASCADE
    )

        
    def __str__(self):
        return self.name

class DebtItem(models.Model):
    name = models.CharField(max_length=60)
    amount = models.IntegerField()
    group_id = models.ForeignKey(
        Group,
        related_name='debt_items',
        on_delete=models.CASCADE
    )

        
    def __str__(self):
        return self.name


class DebtObligation(models.Model):
    debtor = models.ForeignKey(
        GroupMember,
        related_name="debtor"
    )
    creditor = models.ForeignKey(
        GroupMember,
        related_name="creditor"
    )
    amount = models.IntegerField()
    debt_item_id = models.ForeignKey(
        DebtItem,
        related_name="debt_obligations",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.debtor.name + self.creditor.name