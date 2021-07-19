from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.views import Response
from .models import Companies, Students, Universities, User
from api.serializers import UserSerializer, StudentSerializer, CompanySerializer, UniversitySerializer
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *

@api_view(['POST', ])
def register_student(request):
    user = User(user_type=0)
    print(request.data)
    if request.method == "POST":
        user_serializer = UserSerializer(user, data=request.data, fields=('email', 'password', 'first_name', 'last_name'))
        student = Students(user_id=user)
        student_serializer = StudentSerializer(student, data=request.data, fields=('university',))
        if user_serializer.is_valid() and student_serializer.is_valid():
            user_serializer.save()
            student_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)