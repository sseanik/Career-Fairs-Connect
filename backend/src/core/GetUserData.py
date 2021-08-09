from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Stalls, Students, Universities, Companies
from .serializers import (
    StallsSerializer,
    UserSerializer,
    CompanySerializer,
    UniversitySerializer,
    StudentSerializer,
)
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class userData(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "user_type": openapi.Schema(type=openapi.TYPE_STRING),
                    "user_id": openapi.Schema(type=openapi.TYPE_STRING),
                    "additional user characteristics": openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Items(
                            type="university, wam, student_id, company_id, university_id"
                        ),
                    ),
                },
            ),
            404: "Not found",
        },
        operation_summary="Get detailed user data",
        operation_description="Returns user data specific to user type (Student, University, Company)",
    )
    def get(self, request, *args, **kwargs):
        token = request.user.auth_token
        try:
            user = Token.objects.get(key=token).user
            user = User.objects.get(email=user)
            usertype = user.user_type
        except:
            return Response(status=404)
        userid = user.userID
        if usertype == 0:  # student
            data = Students.objects.get(user_id=userid)
            serializer = StudentSerializer(data)
            data = serializer.data
            data["user_type"] = "Student"
            return Response(data, status=200)
        if usertype == 1:  # university
            data = Universities.objects.get(user_id=userid)
            serializer = UniversitySerializer(data)
            data = serializer.data
            data["user_type"] = "University"
            return Response(data, status=200)
        if usertype == 2:  # company
            data = Companies.objects.get(user_id=userid)
            serializer = CompanySerializer(data)
            data = serializer.data
            data["user_type"] = "Company"
            return Response(data, status=200)
        else:
            return Response(status=404)
