from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.views import Response
from .models import Companies, Students, Universities, User
from api.serializers import UserSerializer, StudentSerializer, CompanySerializer, UniversitySerializer
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
# from .serializers import *
# models

class Company(APIView):
    def get(self, request, *args, **kwargs):
        serializer_class = CompanySerializer
        companyField = self.kwargs['companyId']
        try:
            companyData = Companies.objects.get(company_id=companyField)
        except:
            return Response(status=404)
        serializer = CompanySerializer(companyData)
        # json = JSONRenderer().render(serializer.data)
        return Response(serializer.data, status=200)


