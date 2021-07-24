from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import OpportunitySerializer, StallsSerializer
from .models import *


class OpportunityList(APIView):
    def post(self, request, companyId, format=None):
        serializer = OpportunitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, companyId, format=None):
        #opportunities = Opportunities.objects.filter(company_id=companyId)
        opportunities = Opportunities.objects.all()
        serializer = OpportunitySerializer(opportunities, many=True)
        return Response(serializer.data)

class StallList(APIView):
    def post(self, request, eventId, format=None):
        serializer = StallsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)