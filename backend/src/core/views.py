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
        student = Students(user_id=user)
        student_serializer = StudentSerializer(student, data=request.data, fields=('university',))
        if user_serializer.is_valid() and student_serializer.is_valid():
            user_serializer.save()
            student_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

# models and serializers
from .models import *
from .serializers import *
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

class RegisterCompany(APIView):
    def post(self, request, *args, **kwargs):
        # if self.kwargs['acctype'] == 'company':
        # serializer_class = CompanySerializer
        # reqdata = request.data
        # data = {
        #     'secondtest' : 'success'
        # }
        return Response(status=500)
# Create your views here.

