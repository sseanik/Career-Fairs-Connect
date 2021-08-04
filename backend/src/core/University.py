from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import UniversitySerializer
from rest_framework import status
from .models import *
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class University(APIView):
    serializer_class = UniversitySerializer
    def get(self, request, universityId):
        university = get_object_or_404(Universities, pk=universityId)
        serializer = UniversitySerializer(university, fields=("university_id", "university_name", "university_abbreviation", "university_logo_url", "university_site_url"))
        return Response(serializer.data, status=200)
    
    @swagger_auto_schema(request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'university_name': openapi.Schema(type=openapi.TYPE_STRING, description='max length 50\nnot null'),
        'university_abbreviation': openapi.Schema(type=openapi.TYPE_STRING, description='max length 10\nnot null'),
        'university_logo_url': openapi.Schema(type=openapi.TYPE_STRING, description='base64 image'),
        'university_site_url': openapi.Schema(type=openapi.TYPE_STRING, description='max length 150\n'),
        }))
    def put(self, request, universityId, format=None):
        university = get_object_or_404(Universities, pk=universityId)
        serializer = UniversitySerializer(university, data=request.data, fields=("university_name", "university_abbreviation", "university_logo_url", "university_site_url"))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


