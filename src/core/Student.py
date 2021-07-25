from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import *
from rest_framework import status
from django.shortcuts import get_object_or_404

class Student(APIView):
    serializer_class = StudentSerializer

    def get(self, request, studentId):
        student = get_object_or_404(Students, pk=studentId)
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=200)

    def put(self, request, studentId, format=None):
        student = get_object_or_404(Students, pk=studentId)
        serializer = StudentSerializer(student, data=request.data, fields=("first_name", "last_name", "university", "wam", "degree"))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


