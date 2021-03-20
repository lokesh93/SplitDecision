# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2021-02-28 16:23
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('splitdecisionApi', '0003_auto_20210228_1108'),
    ]

    operations = [
        migrations.CreateModel(
            name='DebtObligation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField()),
                ('creditor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='creditor', to='splitdecisionApi.GroupMember')),
                ('debt_item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='splitdecisionApi.DebtItem')),
                ('debtor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='debtor', to='splitdecisionApi.GroupMember')),
            ],
        ),
    ]
