# Generated by Django 2.0.6 on 2020-04-08 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_auto_20200408_0829'),
    ]

    operations = [
        migrations.AlterField(
            model_name='facility',
            name='latitude',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='facility',
            name='longitude',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='latitude',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='longitude',
            field=models.FloatField(null=True),
        ),
    ]
