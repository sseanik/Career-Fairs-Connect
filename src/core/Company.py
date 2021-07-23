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
    serializer_class = CompanySerializer
    def get(self, request, *args, **kwargs):

        companyField = self.kwargs['companyId']
        try:
            companyData = Companies.objects.get(company_id=companyField)
        except:
            return Response(status=404)
        serializer = CompanySerializer(companyData)
        # json = JSONRenderer().render(serializer.data)
        return Response(serializer.data, status=200)

    def post(self, request, companyId, format=None):
        company = Companies.objects.get(company_id=companyId)
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


