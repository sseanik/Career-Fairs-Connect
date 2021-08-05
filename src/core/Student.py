from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import *
from rest_framework import status
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
class Student(APIView):
    serializer_class = StudentSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    
    @swagger_auto_schema(responses={
        200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
            "student_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "university": openapi.Schema(type=openapi.TYPE_STRING),
            "first_name": openapi.Schema(type=openapi.TYPE_STRING),
            "last_name": openapi.Schema(type=openapi.TYPE_STRING),
            "degree": openapi.Schema(type=openapi.TYPE_STRING),
            "wam": openapi.Schema(type=openapi.TYPE_NUMBER),
            "student_logo_64": openapi.Schema(type=openapi.TYPE_STRING),
            "user_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            }),
        404 : "Not found",
    })
    def get(self, request, studentId):
        student = get_object_or_404(Students, pk=studentId)
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=200)
        
    @swagger_auto_schema(request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='max length 50\nnot null'),
        'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='max length 50\nnot null'),
        'university': openapi.Schema(type=openapi.TYPE_STRING, description='max length 50\nnot null'),
        'wam': openapi.Schema(type=openapi.TYPE_NUMBER, description='decimal\nmax digits = 5\n decimal places = 2'),
        'degree': openapi.Schema(type=openapi.TYPE_STRING, description='max length 100'),
        }))
    def put(self, request, studentId, format=None):
        student = get_object_or_404(Students, pk=studentId)
        serializer = StudentSerializer(student, data=request.data, fields=("first_name", "last_name", "university", "wam", "degree", "student_logo_64"))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


