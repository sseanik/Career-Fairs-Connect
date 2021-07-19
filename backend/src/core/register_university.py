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
def register_university(request):
    user = User(user_type=1)
    print(request.data)
    if request.method == "POST":
        user_serializer = UserSerializer(user, data=request.data, fields=('email', 'password',))
        university = Universities(user_id=user)
        university_serializer = UniversitySerializer(university, data=request.data, fields=('university_name', 'university_abbreviation', 'university_logo_url'))
        if user_serializer.is_valid() and university_serializer.is_valid():
            user_serializer.save()
            university_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

