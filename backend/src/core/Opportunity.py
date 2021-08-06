
from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework import status
from .models import *
from .serializers import OpportunitySerializer
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

class Opportunity(APIView):
    def get(self, request, id, format=None):
        opportunity = get_object_or_404(self, pk=id)
        serializer = OpportunitySerializer(opportunity)
        return Response(serializer.data, status=200)

    @swagger_auto_schema(request_body=OpportunitySerializer)
    def post(self, request, id, format=None):
        opportunity = get_object_or_404(self, pk=id)
        serializer = OpportunitySerializer(opportunity, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @swagger_auto_schema(responses={
        200 : "Ok",
        404 : "Not found"
    })
    def delete(self, request, id):
        opportunity = get_object_or_404(self, pk=id)
        opportunity.delete()
        return Response(status=status.HTTP_200_OK)

