# Generated by Django 3.2.5 on 2021-07-30 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_careerfairs'),
    ]

    operations = [
        migrations.AddField(
            model_name='universities',
            name='university_site_url',
            field=models.CharField(default='', max_length=150),
        ),
    ]
