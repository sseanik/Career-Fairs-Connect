import json
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from rest_framework.views import APIView, Response
from rest_framework import status
from .models import CareerFairs, Universities
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import CareerFairSerializer

class EditCareerFair(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
    request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'title': openapi.Schema(type=openapi.TYPE_STRING),
        'description': openapi.Schema(type=openapi.TYPE_STRING),
        'start_date': openapi.Schema(type=openapi.TYPE_STRING),
        'end_date': openapi.Schema(type=openapi.TYPE_STRING),
    }),
    responses={
    
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'description': openapi.Schema(type=openapi.TYPE_STRING),
                'start_date': openapi.Schema(type=openapi.TYPE_STRING),
                'end_date': openapi.Schema(type=openapi.TYPE_STRING),
            }),
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not found",
    },
    operation_summary="Update Career fair",
    operation_description="Editable fields include: title, description, start_date & end_date. Title, start_date and end_date are mandatory.",
    )
    def put(self, request, eventId, *args, **kwargs):
        if request.user.user_type != 1:
            return Response({"Forbidden" : "Incorrect user_type"}, status=403)
        careerfair = get_object_or_404(CareerFairs, pk=eventId)
        requestUserUniversity = careerfair.university_id.university_id
        careerFairOwner = CareerFairs.objects.get(event_id = eventId).university_id.university_id
        if requestUserUniversity != careerFairOwner:
            return Response({"Forbidden" : "Stall does not belong to user"}, status=403)
        serializer = CareerFairSerializer(careerfair, data=request.data, fields=("title", "description", "start_date", "end_date"))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
    responses={
        200 : "deleted",
        401 : "Unauthorized",
        403 : "Forbidden (permission denied)",
        },
        operation_summary="Delete career fair",
        operation_description="Delete career fairs specified at endpoint. Deletion cascades to all stalls, applications & approvals, opportunities, presentations etc",
    )
    def delete(self, request, eventId, *args, **kwargs):
        if request.user.user_type != 1:
            return Response({"Forbidden" : "Incorrect user_type"}, status=403)
        careerfair = get_object_or_404(CareerFairs, pk=eventId)
        requestUserUniversity = careerfair.university_id.university_id
        careerFairOwner = CareerFairs.objects.get(event_id = eventId).university_id.university_id
        if requestUserUniversity != careerFairOwner:
            return Response({"Forbidden" : "Stall does not belong to user"}, status=403)
        careerfair.delete() #deletion cascades to all stalls, applications & approvals, opportunities, presentations etc
        return Response("deleted", status=200)
