# Generated by Django 3.2.5 on 2021-08-06 14:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stalls',
            name='stall_description',
        ),
        migrations.RemoveField(
            model_name='stalls',
            name='title',
        ),
    ]