from rest_framework.views import Response
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from django.contrib.auth.hashers import make_password

@api_view(['POST', ])
def register_university(request):
    user = User(user_type=1)
    print(request.data)
    request.POST._mutable = True
    # hash passwords
    try:
        request.data['password'] = make_password(request.data['password'])
    except:
        return Response({"error":"password field is requred"}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "POST":
        user_serializer = UserSerializer(user, data=request.data, fields=('email', 'password',))
        university = Universities(user_id=user)
        university_serializer = UniversitySerializer(university, data=request.data, fields=('university_name', 'university_abbreviation', 'university_logo_url'))
        if not user_serializer.is_valid() and not university_serializer.is_valid():
            return Response([university_serializer.errors, user_serializer.errors])
        if not user_serializer.is_valid():
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        if not university_serializer.is_valid():
            return Response(university_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user_serializer.save()
        university_serializer.save()
        return Response([user_serializer.data, university_serializer.data], status=status.HTTP_201_CREATED)


