from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import StallsSerializer
from .models import Stalls, Universities, CareerFairs
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class Approvals(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(responses={
        200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
            "fair title": openapi.Schema(type=openapi.TYPE_NUMBER),
            "event_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "pending stalls": openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Items(type="stall_id, company_id, event_id, stall_description, approval status")),
            }),
        403 : "Forbidden",
        404 : "Not found",
        },
        operation_summary="Get all stalls pending Uni approval",
        operation_description="Returns only the pending stalls from the caller's owned careerfairs",
    )
    def get(self, request, *args, **kwargs):
        if request.user.user_type != 1:
            return Response(status = 403) #forbidden
        try:
            data = {}
            university = Universities.objects.get(user_id = request.user.userID).university_id
            events = CareerFairs.objects.filter(university_id=university)
            i = 0
            for event in events:
                stalls = Stalls.objects.filter(event_id = event.event_id, approval_status = "Pending")
                serializer = StallsSerializer(stalls, many=True)
                data[i] = { "event_id" : event.event_id ,
                            "event_title" : event.title,
                            "pending stalls" : serializer.data
                }
                i += 1
        except:
            return Response({}, status=404)
        return Response(data, status=200)
        



    @swagger_auto_schema(request_body=StallsSerializer, responses={
        200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
            "approval_status": openapi.Schema(type=openapi.TYPE_STRING),
            "company_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "event_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "stall_description": openapi.Schema(type=openapi.TYPE_STRING),
        }),
        400 : "Bad request",
        404 : "Not found",
        },
        operation_summary="University approve or deny stall application",
        operation_description="Updates 'approved_status' field in Stalls from Pending",
    )
    def put(self, request, format=None): 
        company_id = request.data['companyId']
        event_id = request.data['eventId']
        stall = Stalls.objects.filter(company_id=request.data['companyId'], event_id=request.data["eventId"])
        if not stall:
            return Response('Cannot find stall for company_id= '+ str(company_id) + ' and event_id= ' + str(event_id),
                            status=404)
        stall = stall[0]
        if request.data["approval"] == True:
            stall.approval_status = "Approved"
            stall.save()
            return Response("Application approved")
        else:
            stall.approval_status = "Rejected"
            stall.save()
            return Response("Application denied")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


