from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import StallsSerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class StallList(APIView):
    @swagger_auto_schema(
        request_body=StallsSerializer,
        responses={
            400: "Bad request",
            401: "Unauthorized",
            403: "Forbidden",
            404: "Not found",
            20: "OK",
        },
        operation_summary="Create stalls for given careerfair",
        operation_description="Create stall for given company caller at specified careerfair",
    )
    def post(self, request, eventId, format=None):
        request.data["event_id"] = eventId
        if not request.user.is_authenticated:
            return Response(
                "Please pass Token in the Authorisation header",
                status=status.HTTP_401_UNAUTHORIZED,
            )
        if request.user.user_type != User.COMPANY:
            return Response(
                "Only Company users can access this endpoint",
                status=status.HTTP_403_FORBIDDEN,
            )
        # company derivation from token
        company = Companies.objects.filter(user_id_id=request.user.userID)
        if not company:
            return Response(
                "Couldn't find company associated with user "
                + str(request.user.userID),
                status=status.HTTP_404_NOT_FOUND,
            )
        company = company[0]  # retains the first object of the queryset
        existing_stall = Stalls.objects.filter(
            company_id_id=company.company_id, event_id_id=eventId
        )
        if existing_stall:
            return Response(
                "A stall for company "
                + company.company_name
                + " and event "
                + str(eventId)
                + " already exists",
                status=status.HTTP_400_BAD_REQUEST,
            )

        request.data["company_id"] = company.company_id
        serializer = StallsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
