# Generated by Django 3.2.5 on 2021-08-08 09:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='qamessages',
            name='responder_id',
        ),
    ]
