from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework import status
from .models import *
from .serializers import OpportunitySerializer
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated


class Opportunity(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        responses={200: "Deleted", 403: "Forbidden", 404: "Not found"},
        operation_summary="Delete opportunity",
        operation_description="Opportunity must be owned by caller or 403",
    )

    # delete opportunity
    def delete(self, request, job_id):
        if request.user.user_type != 2:
            return Response({"Forbidden": "Incorrect user type"}, status=403)
        opportunity = get_object_or_404(Opportunities, pk=job_id)
        opportunityCompanyId = opportunity.stall_id.company_id.company_id
        # locate opportunity
        userCompanyId = Companies.objects.get(user_id=request.user.userID).company_id
        if opportunityCompanyId != userCompanyId:
            return Response(
                {"Forbidden": "Opportunity does not belong to user"}, status=403
            )
        opportunity = get_object_or_404(Opportunities, pk=job_id)
        opportunity.delete()
        return Response("Deleted", status=status.HTTP_200_OK)
