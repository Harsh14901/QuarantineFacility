# Generated by Django 2.0.6 on 2020-04-04 12:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='facility',
            name='capacity',
        ),
        migrations.RemoveField(
            model_name='ward',
            name='capacity',
        ),
    ]
