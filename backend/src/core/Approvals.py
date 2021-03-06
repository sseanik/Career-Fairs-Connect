from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import StallsSerializer
from .models import Stalls, Universities, CareerFairs
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# class dealing with company approvals

class Approvals(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "fair title": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "event_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "pending stalls": openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Items(
                            type="stall_id, company_id, event_id, stall_description, approval status"
                        ),
                    ),
                },
            ),
            403: "Forbidden",
            404: "Not found",
        },
        operation_summary="Get all stalls pending Uni approval",
        operation_description="Returns only the pending stalls from the caller's owned careerfairs",
    )

    # get approvals objects for all events
    def get(self, request, *args, **kwargs):
        if request.user.user_type != 1:
            return Response(status=403)  # forbidden
        try:
            data = {}
            university = Universities.objects.get(
                user_id=request.user.userID
            ).university_id
            # get career fair events
            events = CareerFairs.objects.filter(university_id=university)
            i = 0
            for event in events:
                stalls = Stalls.objects.filter(
                    event_id=event.event_id, approval_status="Pending"
                )
                serializer = StallsSerializer(stalls, many=True)
                data[i] = {
                    "event_id": event.event_id,
                    "event_title": event.title,
                    "pending stalls": serializer.data,
                }
                i += 1
        except:
            return Response({}, status=404)
        return Response(data, status=200)

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "stall_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                "approval": openapi.Schema(type=openapi.TYPE_STRING),
            },
        ),
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "stall_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "event_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "company_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "approval_status": openapi.Schema(type=openapi.TYPE_STRING),
                },
            ),
            400: "Bad request - approval must be either 'true' or 'false' for Approved and Rejected respectively",
            404: "Not found",
        },
        operation_summary="University approve or deny stall application",
        operation_description="Updates 'approval_status' field in Stalls from Pending",
    )
    # update approval status of a stall
    def put(self, request, format=None):
        # stalld = request.data['stall_id']
        try:
            stall = Stalls.objects.get(stall_id=request.data["stall_id"])
        except:
            return Response(status=404)
        stall.approval_status = request.data["approval_status"]
        if (
            stall.approval_status != "Pending"
            and stall.approval_status != "Approved"
            and stall.approval_status != "Rejected"
        ):
            return Response("Whatever", status=400)

        serializer = StallsSerializer(stall)
        stall.save()
        return Response(serializer.data, status=200)
