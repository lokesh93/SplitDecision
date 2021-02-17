# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Hero, Group, GroupMember

admin.site.register(Hero)
admin.site.register(Group)
admin.site.register(GroupMember)

# Register your models here.
