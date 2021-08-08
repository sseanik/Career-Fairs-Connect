from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import StallsSerializer
from .models import Stalls
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

class CompanyStallData(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(responses= {
        200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
            "company_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "event_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "stall_description": openapi.Schema(type=openapi.TYPE_STRING),
            "approval_status": openapi.Schema(type=openapi.TYPE_STRING),
        }),
        401 : "Unauthorized"
        },
        operation_summary="Get company stall data",
        operation_description="Deprecated - see get_stall_data",
    )
    def get(self, request, stallId, format=None):
        stallData = Stalls.objects.all()
        serializer = StallsSerializer(stallData, many=True)
        return Response(serializer.data, status = 200)