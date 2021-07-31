from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import StallsSerializer
from .models import Stalls
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated

class CompanyStallData(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, stallId, format=None):
        if request.user.IsAuthenticated():
            stallData = Stalls.objects.filter(stall_id = stallId)
            return Response(StallsSerializer(stallData), status=200)
        return Response(status=401)