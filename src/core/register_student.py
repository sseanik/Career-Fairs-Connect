from rest_framework.views import Response
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from django.contrib.auth.hashers import make_password

@api_view(['POST', ])
def register_student(request):
    user = User(user_type=User.STUDENT)
    request.POST._mutable = True
    # hash passwords
    try:
        request.data['password'] = make_password(request.data['password'])
    except:
        return Response({"error":"password field is requred"}, status=status.HTTP_400_BAD_REQUEST)

    user_serializer = UserSerializer(user, data=request.data, fields=('email', 'password'))
    student = Students(user_id=user)
    student_serializer = StudentSerializer(student, data=request.data, fields=('university','first_name', 'last_name'))
    if not user_serializer.is_valid() and not student_serializer.is_valid():
        return Response([student_serializer.errors, user_serializer.errors])
    if not user_serializer.is_valid():
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if not student_serializer.is_valid():
        return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    user_serializer.save()
    student_serializer.save()
    return Response([user_serializer.data, student_serializer.data], status=status.HTTP_201_CREATED)