
from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework import status
from .models import *
from .serializers import OpportunitySerializer
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

class Opportunity(APIView):
    @swagger_auto_schema(
        responses={
            200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
                "job_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                "job_description": openapi.Schema(type=openapi.TYPE_STRING),
                "stall_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                "role": openapi.Schema(type=openapi.TYPE_STRING),
                "type": openapi.Schema(type=openapi.TYPE_STRING),
                "location": openapi.Schema(type=openapi.TYPE_STRING),
                "wam": openapi.Schema(type=openapi.TYPE_NUMBER),
                "expiry": openapi.Schema(type=openapi.TYPE_STRING),
                "link": openapi.Schema(type=openapi.TYPE_STRING),
                "application_link": openapi.Schema(type=openapi.TYPE_STRING),
                }),
            404 : "Not found"
        },
        operation_summary="Get detailed opportunity",
        # operation_description="Returns opportunity data",
    )
    def get(self, request, companyId, jobId, format=None):
        opportunity = get_object_or_404(Opportunities, pk=jobId)
        serializer = OpportunitySerializer(opportunity)
        return Response(serializer.data, status=200)
    
    @swagger_auto_schema(
        responses={
            200 : "Ok",
            404 : "Not found"
        },
        operation_summary="Delete opportunity",
        # operation_description="",
    )
    def delete(self, request, id):
        opportunity = get_object_or_404(Opportunities, pk=id)
        opportunity.delete()
        return Response(status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            "job_description": openapi.Schema(type=openapi.TYPE_STRING),
            "role": openapi.Schema(type=openapi.TYPE_STRING),
            "type": openapi.Schema(type=openapi.TYPE_STRING),
            "location": openapi.Schema(type=openapi.TYPE_STRING),
            "wam": openapi.Schema(type=openapi.TYPE_NUMBER),
            "expiry": openapi.Schema(type=openapi.TYPE_STRING),
            "link": openapi.Schema(type=openapi.TYPE_STRING),
            "application_link": openapi.Schema(type=openapi.TYPE_STRING),
        }),
        responses={
            200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
                "job_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                "job_description": openapi.Schema(type=openapi.TYPE_STRING),
                "stall_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                "role": openapi.Schema(type=openapi.TYPE_STRING),
                "type": openapi.Schema(type=openapi.TYPE_STRING),
                "location": openapi.Schema(type=openapi.TYPE_STRING),
                "wam": openapi.Schema(type=openapi.TYPE_NUMBER),
                "expiry": openapi.Schema(type=openapi.TYPE_STRING),
                "link": openapi.Schema(type=openapi.TYPE_STRING),
                "application_link": openapi.Schema(type=openapi.TYPE_STRING),
            }),
            401 : "Unauthorized",
            400 : "Bad request",
            403 : "Forbidden"
        },
        operation_summary="Update job opportunity",
        operation_description="As company, update a job opportunity. Company can only edit its opportunities",
    )
    def put(self, request, companyId, jobId, format=None):
        if request.user.user_type != User.COMPANY:
            return Response({"Forbidden" : "Only companies can edit job opportunities"}, status=status.HTTP_403_FORBIDDEN)
        opportunity = get_object_or_404(Opportunities, pk=jobId)
        stall = opportunity.stall_id
        requestUserCompany = Companies.objects.get(user_id=request.user.userID)
        if requestUserCompany.company_id != stall.company_id_id:
            return Response({"Forbidden" : "You cannon edit some other company's job opportunities"}, status=status.HTTP_403_FORBIDDEN)

        request.data["stall_id"] = stall.stall_id
        opportunity_serializer = OpportunitySerializer(opportunity, data=request.data)
        if opportunity_serializer.is_valid():
            opportunity_serializer.save()
            return Response(opportunity_serializer.data, status=status.HTTP_200_OK)
        return Response(opportunity_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

