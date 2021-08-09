from rest_framework.views import Response
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from django.contrib.auth.hashers import make_password
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


@swagger_auto_schema(
    method="post",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "university_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "university_name": openapi.Schema(type=openapi.TYPE_STRING),
            "university_logo_64": openapi.Schema(type=openapi.TYPE_STRING),
            "university_site_url": openapi.Schema(type=openapi.TYPE_STRING),
            "student_logo_64": openapi.Schema(type=openapi.TYPE_STRING),
            "user_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "password": openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
    responses={
        400: "Bad request",
        201: "Successful Registration",
    },
    operation_summary="Register as university",
)
@api_view(
    [
        "POST",
    ]
)
def register_university(request):
    user = User(user_type=User.UNIVERSITY)
    request.POST._mutable = True
    # hash passwords for security
    try:
        request.data["password"] = make_password(request.data["password"])
    except:
        return Response(
            {"error": "password field is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    user_serializer = UserSerializer(
        user,
        data=request.data,
        fields=(
            "email",
            "password",
        ),
    )
    university = Universities(user_id=user)
    university_serializer = UniversitySerializer(
        university,
        data=request.data,
        fields=("university_name", "university_logo_64", "university_site_url"),
    )
    # Validity check for user and university models
    if not user_serializer.is_valid() and not university_serializer.is_valid():
        return Response([university_serializer.errors, user_serializer.errors])
    if not user_serializer.is_valid():
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if not university_serializer.is_valid():
        return Response(
            university_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )
    user_serializer.save()
    university_serializer.save()
    return Response(
        {"message": "Account successfully created"}, status=status.HTTP_201_CREATED
    )
