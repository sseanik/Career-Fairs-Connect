from rest_framework.views import Response
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from django.contrib.auth.hashers import make_password


@api_view(
    [
        "POST",
    ]
)
def register_company(request):
    user = User(user_type=User.COMPANY)
    request.POST._mutable = True
    # hash passwords
    try:
        request.data["password"] = make_password(request.data["password"])
    except:
        return Response(
            {"error": "password field is requred"}, status=status.HTTP_400_BAD_REQUEST
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
