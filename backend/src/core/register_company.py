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
def register_company(request):
    user = User(user_type=2)
    print(request.data)
    if request.method == "POST":
        user_serializer = UserSerializer(user, data=request.data, fields=('email', 'password'))
        company = Companies(user_id=user)
        company_serializer = CompanySerializer(company, data=request.data, fields=('company_name', 'company_description', 'company_webpage_url', 'company_logo_url'))
        if not user_serializer.is_valid() and not company_serializer.is_valid():
            return Response([company_serializer.errors, user_serializer.errors])
        if not user_serializer.is_valid():
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        if not company_serializer.is_valid():
            return Response(company_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user_serializer.save()
        company_serializer.save()
        return Response([user_serializer.data, company_serializer.data], status=status.HTTP_201_CREATED)