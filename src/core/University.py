from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import UniversitySerializer
from rest_framework import status
from .models import *
from django.shortcuts import get_object_or_404


class University(APIView):
    serializer_class = UniversitySerializer

    def get(self, request, universityId):
        university = get_object_or_404(Universities, pk=universityId)
        serializer = UniversitySerializer(university, fields=("university_id", "university_name", "university_abbreviation", "university_logo_url", "university_site_url"))
        return Response(serializer.data, status=200)

    def put(self, request, universityId, format=None):
        university = get_object_or_404(Universities, pk=universityId)
        serializer = UniversitySerializer(university, data=request.data, fields=("university_name", "university_abbreviation", "university_logo_url", "university_site_url"))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


