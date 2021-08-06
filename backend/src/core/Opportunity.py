
from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework import status
from .models import *
from .serializers import OpportunitySerializer
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

class Opportunity(APIView):
    @swagger_auto_schema(responses={
        200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
            "job_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "job_description": openapi.Schema(type=openapi.TYPE_STRING),
            "stall_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "role": openapi.Schema(type=openapi.TYPE_STRING),
            "location": openapi.Schema(type=openapi.TYPE_STRING),
            "wam": openapi.Schema(type=openapi.TYPE_NUMBER),
            "expiry": openapi.Schema(type=openapi.TYPE_STRING),
            "link": openapi.Schema(type=openapi.TYPE_STRING),
            }),
        404 : "Not found"
    })
    def get(self, request, job_id, format=None):
        opportunity = get_object_or_404(self, pk=job_id)    #culprit?
        serializer = OpportunitySerializer(opportunity)
        return Response(serializer.data, status=200)
    
    @swagger_auto_schema(responses={
        200 : "Ok",
        404 : "Not found"
    })
    def delete(self, request, id):
        opportunity = get_object_or_404(self, pk=id)
        opportunity.delete()
        return Response(status=status.HTTP_200_OK)

