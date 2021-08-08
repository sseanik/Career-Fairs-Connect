from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import CompanySerializer
from rest_framework import status
from .models import *
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

class Company(APIView):
    serializer_class = CompanySerializer
    @swagger_auto_schema(responses={
            200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
                "company_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                "company_name": openapi.Schema(type=openapi.TYPE_STRING),
                "company_description": openapi.Schema(type=openapi.TYPE_STRING),
                "company_webpage_url": openapi.Schema(type=openapi.TYPE_STRING),
                "company_logo_64": openapi.Schema(type=openapi.TYPE_STRING),
            }),
            401 : "Unauthorized",
            403 : "Forbidden",
            400 : "Bad request",
        },
        operation_summary="Get company details",
        # operation_description="",
    )
    def get(self, request, companyId, format=None):
        company = get_object_or_404(Companies, pk=companyId)
        serializer = CompanySerializer(company, fields=("company_id", "company_name", "company_description", "company_webpage_url", "company_logo_64"))
        return Response(serializer.data, status=200)



    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'company_name': openapi.Schema(type=openapi.TYPE_STRING, description='max length 50\nnot null'),
                'company_logo_64': openapi.Schema(type=openapi.TYPE_STRING, description='base64 image'),
                'company_webpage_url': openapi.Schema(type=openapi.TYPE_STRING, description='max length 150\n'),
        }),
        responses={
            200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
                'company_name': openapi.Schema(type=openapi.TYPE_STRING, description='max length 50\nnot null'),
                'company_description': openapi.Schema(type=openapi.TYPE_STRING, description='not null'),
                'company_logo_64': openapi.Schema(type=openapi.TYPE_STRING, description='base64 image'),
                'company_webpage_url': openapi.Schema(type=openapi.TYPE_STRING, description='max length 150\n'),
            }),
            400 : "Bad request",
            401 : "Please pass token in the Authorization header",
            403 : "Forbidden",
            404 : "Not found",
        },
        operation_summary="Update company details",
        operation_description="Company must belong to caller or 403",
    )
    def put(self, request, companyId, format=None):
        if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
        if request.user.user_type != User.COMPANY:
            return Response("Only Company users can access this endpoint", status=status.HTTP_403_FORBIDDEN)
        company = get_object_or_404(Companies, pk=companyId)
        if company.user_id_id != request.user.userID:  # TODO user_id_id -> we need to rename this in all models
            return Response("You can only update info for your company", status=status.HTTP_403_FORBIDDEN)
        serializer = CompanySerializer(company, data=request.data, fields=("company_name", "company_description", "company_webpage_url", "company_logo_64"))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)