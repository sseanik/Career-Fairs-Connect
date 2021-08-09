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
            "company_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "company_name": openapi.Schema(type=openapi.TYPE_STRING),
            "company_description": openapi.Schema(type=openapi.TYPE_STRING),
            "company_webpage_url": openapi.Schema(type=openapi.TYPE_STRING),
            "company_logo_64": openapi.Schema(type=openapi.TYPE_STRING),
            "user_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "password": openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
    responses={
        400: "Bad request",
        201: "Successful Registration",
    },
    operation_summary="Register as company",
)
@api_view(["POST"])
def register_company(request):
    user = User(user_type=User.COMPANY)
    request.POST._mutable = True
    # hash passwords
    try:
        request.data["password"] = make_password(request.data["password"])
    except:
        return Response(
            {"error": "password field is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    user_serializer = UserSerializer(
        user, data=request.data, fields=("email", "password")
    )
    company = Companies(user_id=user)
    company_serializer = CompanySerializer(
        company,
        data=request.data,
        fields=(
            "company_name",
            "company_description",
            "company_webpage_url",
            "company_logo_64",
        ),
    )
    # Validity check for user and company models
    if not user_serializer.is_valid() and not company_serializer.is_valid():
        return Response([company_serializer.errors, user_serializer.errors])
    if not user_serializer.is_valid():
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if not company_serializer.is_valid():
        return Response(company_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    user_serializer.save()
    company_serializer.save()
    return Response(
        {"message": "Account successfully created"}, status=status.HTTP_201_CREATED
    )
