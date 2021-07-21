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

class Student(APIView):
    serializer_class = StudentSerializer
    def get(self, request, *args, **kwargs):

        studentField = self.kwargs['studentId']
        try:
            studentData = Students.objects.get(student_id=studentField)
        except:
            return Response(status=404)
        serializer = StudentSerializer(studentData)
        # json = JSONRenderer().render(serializer.data)
        return Response(serializer.data, status=200)

    def post(self, request, studentId, format=None):
        student = Companies.objects.get(student_id=studentId)
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


