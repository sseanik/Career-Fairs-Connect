from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import OpportunitySerializer
from .models import Stalls, Companies, Opportunities
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated

class OpportunityList(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, stallId, format=None):
        if request.user.user_type != 2:
            return Response(status=403)
        requestUserCompany = Companies.objects.get(user_id = request.user.userID).company_id
        opportunityOwner = Stalls.objects.get(stall_id = stallId).company_id
        if request.user.user_type != 2:
            return Response(status=403)
        serializer = OpportunitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, stallId, format=None):
        opportunities = Opportunities.objects.filter(stall_id=stallId)
        serializer = OpportunitySerializer(opportunities, many=True)
        return Response(serializer.data, status=200)


