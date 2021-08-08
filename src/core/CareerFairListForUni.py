from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CareerFairSerializer
from .models import CareerFairs, Companies, Universities
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404


class CareerFairListForUni(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={
        200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
            "event_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "university_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "title": openapi.Schema(type=openapi.TYPE_STRING),
            "description": openapi.Schema(type=openapi.TYPE_STRING),
            "start_date": openapi.Schema(type=openapi.TYPE_STRING),
            "end_date": openapi.Schema(type=openapi.TYPE_STRING),
            }),
        403 : "Forbidden",
        },
        operation_summary="University self owned career fairs",
        operation_description="Returns career fairs and details for career fairs owned by caller",
    )
    def get (self, request, *args, **kwargs):
        if request.user.user_type != 1:
            return Response(status=403)
        try:
            university = Universities.objects.get(user_id = request.user.userID).university_id
            ownevents = CareerFairs.objects.filter(university_id=university)
        except:
            return Response({}, status=200)
        serializer = CareerFairSerializer(ownevents, many=True)
        return Response(serializer.data, status=200)

    @swagger_auto_schema(request_body=CareerFairSerializer,
        operation_summary="Create new career fair",
        # operation_description="",
    )
    def post(self, request, universityId, format=None):

        request.data["university_id"] = universityId
        serializer = CareerFairSerializer(data=request.data)
        if serializer.is_valid():
            university = get_object_or_404(Universities, pk=universityId)
            serializer.save()
            serializer.data.update({"logo":university.university_logo_64})
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


