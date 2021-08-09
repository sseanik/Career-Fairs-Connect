from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import UniversitySerializer
from rest_framework import status
from .models import *
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class University(APIView):
    serializer_class = UniversitySerializer

    @swagger_auto_schema(
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "university_id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "university_name": openapi.Schema(type=openapi.TYPE_STRING),
                    "university_logo_64": openapi.Schema(type=openapi.TYPE_STRING),
                    "university_site_url": openapi.Schema(type=openapi.TYPE_STRING),
                    "user_id": openapi.Schema(type=openapi.TYPE_STRING),
                },
            ),
            403: "Forbidden",
            404: "Not found",
        },
        operation_summary="Get university data",
    )
    def get(self, request, universityId):
        university = get_object_or_404(Universities, pk=universityId)
        serializer = UniversitySerializer(
            university,
            fields=(
                "university_id",
                "university_name",
                "university_logo_64",
                "university_site_url",
            ),
        )
        return Response(serializer.data, status=200)

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "university_name": openapi.Schema(
                    type=openapi.TYPE_STRING, description="max length 50\nnot null"
                ),
                "university_logo_64": openapi.Schema(
                    type=openapi.TYPE_STRING, description="base64 image"
                ),
                "university_site_url": openapi.Schema(
                    type=openapi.TYPE_STRING, description="max length 150\n"
                ),
            },
        ),
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "university_name": openapi.Schema(
                        type=openapi.TYPE_STRING, description="max length 50\nnot null"
                    ),
                    "university_logo_64": openapi.Schema(
                        type=openapi.TYPE_STRING, description="base64 image"
                    ),
                    "university_site_url": openapi.Schema(
                        type=openapi.TYPE_STRING, description="max length 150\n"
                    ),
                },
            ),
            400: "Bad request",
            403: "Forbidden",
            404: "Not found",
        },
        operation_summary="Update university data",
        operation_description="University must be owned by caller or 403",
    )
    def put(self, request, universityId, format=None):
        # checks for university ownership prior to put details
        if request.user.user_type != 1:
            return Response({"Forbidden": "Incorrect user type"}, status=403)
        university = get_object_or_404(Universities, pk=universityId)
        userUniversityId = Universities.objects.get(
            user_id=request.user.userID
        ).university_id
        if int(universityId) != userUniversityId:
            return Response(
                {"Forbidden": "University does not belong to user"}, status=403
            )
        serializer = UniversitySerializer(
            university,
            data=request.data,
            fields=("university_name", "university_logo_64", "university_site_url"),
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
