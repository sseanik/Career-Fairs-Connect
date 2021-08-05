from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CareerFairSerializer
from .models import CareerFairs, Universities
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class CareerFairListForUni(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={
        200 : "Ok",
        403 : "Forbidden",
    })
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

    @swagger_auto_schema(request_body=CareerFairSerializer)   
    def post(self, request, universityId, format=None):
        request.data["university_id"] = universityId
        serializer = CareerFairSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


