from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import OpportunitySerializer
from .models import Stalls, Companies, Opportunities
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class OpportunityList(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=OpportunitySerializer,
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "job_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "job_description": openapi.Schema(type=openapi.TYPE_STRING),
                    "stall_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "role": openapi.Schema(type=openapi.TYPE_STRING),
                    "location": openapi.Schema(type=openapi.TYPE_STRING),
                    "wam": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "expiry": openapi.Schema(type=openapi.TYPE_STRING),
                    "application_link": openapi.Schema(type=openapi.TYPE_STRING),
                },
            ),
            401: "Unauthorized",
            400: "Bad request",
            403: "Forbidden",
        },
        operation_summary="Create new opportunity",
        operation_description="Create opportunity as company, under a particular stall. Stall must be owned by caller",
    )
    def post(self, request, stallId, format=None):
        # create opportunity to stall, requires check for caller to be stall owner
        if request.user.user_type != 2:
            return Response({"Forbidden": "Incorrect user_type"}, status=403)
        requestUserCompany = Companies.objects.get(
            user_id=request.user.userID
        ).company_id
        opportunityOwner = Stalls.objects.get(stall_id=stallId).company_id.company_id
        if requestUserCompany != opportunityOwner:
            return Response({"Forbidden": "Stall does not belong to user"}, status=403)
        serializer = OpportunitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    @swagger_auto_schema(
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "job_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "job_description": openapi.Schema(type=openapi.TYPE_STRING),
                    "stall_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "role": openapi.Schema(type=openapi.TYPE_STRING),
                    "location": openapi.Schema(type=openapi.TYPE_STRING),
                    "wam": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "expiry": openapi.Schema(type=openapi.TYPE_STRING),
                    "application_link": openapi.Schema(type=openapi.TYPE_STRING),
                },
            ),
            401: "Unauthorized",
            400: "Bad request",
            403: "Forbidden",
        },
        operation_summary="Get all opportunities by stall",
        operation_description="Get all opportunities given a stall",
    )
    def get(self, request, stallId, format=None):
        opportunities = Opportunities.objects.filter(stall_id=stallId)
        serializer = OpportunitySerializer(opportunities, many=True)
        return Response(serializer.data, status=200)

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "job_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                "job_description": openapi.Schema(type=openapi.TYPE_STRING),
                "stall_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                "role": openapi.Schema(type=openapi.TYPE_STRING),
                "type": openapi.Schema(type=openapi.TYPE_STRING),
                "location": openapi.Schema(type=openapi.TYPE_STRING),
                "wam": openapi.Schema(type=openapi.TYPE_NUMBER),
                "expiry": openapi.Schema(type=openapi.TYPE_STRING),
                "application_link": openapi.Schema(type=openapi.TYPE_STRING),
            },
        ),
        responses={
            201: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "job_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "job_description": openapi.Schema(type=openapi.TYPE_STRING),
                    "stall_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "role": openapi.Schema(type=openapi.TYPE_STRING),
                    "location": openapi.Schema(type=openapi.TYPE_STRING),
                    "wam": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "expiry": openapi.Schema(type=openapi.TYPE_STRING),
                    "application_link": openapi.Schema(type=openapi.TYPE_STRING),
                },
            ),
            401: "Unauthorized",
            400: "Bad request",
            403: "Forbidden",
        },
        operation_summary="Update opportunity",
        operation_description="Update an opportunity, can alter the assigned stall to undefined (Beware!), omit stall_id if possible. Stall must be owned by caller",
    )
    def put(self, request, stallId, format=None):
        # update opportunity to stall, requires check for caller to be stall owner
        if request.user.user_type != 2:
            return Response({"Forbidden": "Incorrect user_type"}, status=403)
        requestUserCompany = Companies.objects.get(
            user_id=request.user.userID
        ).company_id
        stallOwner = Stalls.objects.get(stall_id=stallId).company_id.company_id
        if requestUserCompany != stallOwner:
            return Response({"Forbidden": "Stall does not belong to user"}, status=403)
        try:
            opportunity = Opportunities.objects.get(job_id=request.data["job_id"])
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        opportunity_serializer = OpportunitySerializer(
            opportunity,
            data=request.data,
            fields=(
                "job_id",
                "job_description",
                "stall_id",
                "role",
                "location",
                "wam",
                "expiry",
                "application_link",
                "type",
            ),
        )
        if not opportunity_serializer.is_valid():
            return Response(
                opportunity_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        opportunity_serializer.save()
        return Response(opportunity_serializer.data, status=status.HTTP_201_CREATED)
