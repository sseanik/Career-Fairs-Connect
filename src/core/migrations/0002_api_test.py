# Generated by Django 3.2.5 on 2021-07-11 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='api_test',
            fields=[
                ('test_field_1', models.AutoField(primary_key=True, serialize=False)),
                ('test_field_2', models.CharField(max_length=50)),
            ],
        ),
    ]
