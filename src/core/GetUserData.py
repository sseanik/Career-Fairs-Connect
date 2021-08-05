from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Stalls, Students, Universities, Companies
from .serializers import StallsSerializer, UserSerializer, CompanySerializer, UniversitySerializer, StudentSerializer
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token


class userData(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        token = request.user.auth_token
        try:
            user = Token.objects.get(key=token).user
            user = User.objects.get(email = user)
            usertype=user.user_type
        except:
            return Response(status=404)
        userid=user.userID
        if usertype == 0: #student
            data = Students.objects.get(user_id = userid)
            serializer=StudentSerializer(data)
            data.user_type = "Student"
            return Response(serializer.data, status=200)
        if usertype == 1: #university
            data = Universities.objects.get(user_id = userid)
            serializer=UniversitySerializer(data)
            data.user_type = "University"
            return Response(serializer.data, status=200)
        if usertype == 2: #company
            data = Companies.objects.get(user_id = userid)
            serializer=CompanySerializer(data)
            data = serializer.data
            data["user_type"] = "Company"
            return Response(data, status=200)
        else:
            return Response(status=404)
            
        # serializer = UserSerializer(usertype)
        # stallData = Stalls.objects.filter(approval_status = "Pending")
        # serializer = StallsSerializer(stallData, many=True)