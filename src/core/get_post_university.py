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

class University(APIView):
    serializer_class = UniversitySerializer
    def get(self, request, *args, **kwargs):

        universityField = self.kwargs['universityId']
        try:
            universityData = Universities.objects.get(university_id=universityField)
        except:
            return Response(status=404)
        serializer = UniversitySerializer(universityData)
        # json = JSONRenderer().render(serializer.data)
        return Response(serializer.data, status=200)

    def post(self, request, universityId, format=None):
        university = Universities.objects.get(university_id=universityId)
        serializer = UniversitySerializer(university, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


