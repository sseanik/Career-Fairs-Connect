from rest_framework import serializers
from core.models import *


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['name', 'top_speed']


class Student(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['name', 'top_speed']
