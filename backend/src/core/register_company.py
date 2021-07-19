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
        if user_serializer.is_valid() and company_serializer.is_valid():
            user_serializer.save()
            company_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)