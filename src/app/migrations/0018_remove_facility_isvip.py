# Generated by Django 2.0.6 on 2020-04-18 16:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0017_auto_20200418_1228'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='facility',
            name='isVIP',
        ),
    ]
