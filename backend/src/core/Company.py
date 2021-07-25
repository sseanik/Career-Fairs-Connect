from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import CompanySerializer
from rest_framework import status
from .models import *
from django.shortcuts import get_object_or_404

class Company(APIView):
    serializer_class = CompanySerializer

    def get(self, request, companyId, format=None):
        company = get_object_or_404(Companies, pk=companyId)
        serializer = CompanySerializer(company, fields=("company_id", "company_name", "company_description", "company_webpage_url", "company_logo_url"))
        return Response(serializer.data, status=200)

    def put(self, request, companyId, format=None):
        if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
        if request.user.user_type != User.COMPANY:
            return Response("Only Company users can access this endpoint", status=status.HTTP_403_FORBIDDEN)
        company = get_object_or_404(Companies, pk=companyId)
        if company.user_id_id != request.user.userID:  # TODO user_id_id -> we need to rename this in all models
            return Response("You can only update info for your company", status=status.HTTP_403_FORBIDDEN)

        serializer = CompanySerializer(company, data=request.data, fields=("company_name", "company_description", "company_webpage_url", "company_logo_url"))

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


