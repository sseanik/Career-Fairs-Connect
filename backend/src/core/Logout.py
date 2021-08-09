from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

<<<<<<< HEAD
# logout 
=======
>>>>>>> a16270bada02e9b7d7150b13db906830681844d2

class Logout(APIView):
    @swagger_auto_schema(
        responses={
            200: "Logout Succesful",
            401: "Unauthorized",
        },
    )
    def get(self, request, format=None):
        if request.user.is_authenticated:
            # delete token
            request.user.auth_token.delete()
            body = {"message": "Successful Logout"}
            return Response(body, status=status.HTTP_200_OK)
        else:
            return Response(status=401)
