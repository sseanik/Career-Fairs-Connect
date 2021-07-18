from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.views import Response
from .models import Companies, Students, Universities, User
from api.serializers import UserSerializer, StudentSerializer, CompanySerializer, UniversitySerializer
from rest_framework.decorators import api_view
from rest_framework import status
# models

@api_view(['POST', ])
def register_student(request):
    user = User(user_type=0)
    print(request.data)
    if request.method == "POST":
        user_serializer = UserSerializer(user, data=request.data, fields=('email', 'password', 'first_name', 'last_name'))
        if user_serializer.is_valid():
            user_serializer.save()
            student = Students(user_id=user)
            student_serializer = StudentSerializer(student, data=request.data, fields=('university'))
            if student_serializer.is_valid():
                student_serializer.save()

                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', ])
def register_university(request):
    user = User(user_type=1)
    print(request.data)
    if request.method == "POST":
        user_serializer = UserSerializer(user, data=request.data, fields=('email', 'password',))
        if user_serializer.is_valid():
            user_serializer.save()
            university = Universities(user_id=user)
            university_serializer = UniversitySerializer(university, data=request.data, fields=('university_name', 'university_abbreviation', 'university_logo_url'))
            if university_serializer.is_valid():
                university_serializer.save()

                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', ])
def register_company(request):
    user = User(user_type=2)
    print(request.data)
    if request.method == "POST":
        user_serializer = UserSerializer(user, data=request.data, fields=('email', 'password'))
        if user_serializer.is_valid():
            user_serializer.save()
            company = Companies(user_id=user)
            company_serializer = CompanySerializer(company, data=request.data, fields=('company_name', 'company_description', 'company_webpage_url', 'company_logo_url'))
            if company_serializer.is_valid():
                company_serializer.save()

                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)