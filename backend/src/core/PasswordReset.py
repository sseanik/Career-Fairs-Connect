from rest_framework.views import APIView
from rest_framework.views import Response
from .models import User
from api.serializers import PasswordSerializer
from rest_framework import status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

# ref https://stackoverflow.com/questions/38845051/how-to-update-user-password-in-django-rest-framework

# class PasswordReset(APIView):
# needs test/debug once auth table is migrated
class PasswordReset(generics.UpdateAPIView):
        serializer_class = PasswordSerializer
        # model = User
        authentication_classes = [TokenAuthentication, SessionAuthentication]
        permission_classes = [IsAuthenticated]

        def put(self, request, *args, **kwargs):
            if request.user.is_authenticated():
                user = request.user
                serializer = serializer_class(data=request.data)
                if serializer.is_valid():
                    user.set_password(serializer.data.get("new_password"))
                    user.save()
                    response = {}
                    return Response(response, status=200)
                return Response(serializer.errors, status=400)
            return Response(status=401)



#ref

# class User(AbstractBaseUser):
#     # core fields required by django
#     userID = models.AutoField(primary_key=True)
#     email = models.EmailField(verbose_name="email", max_length=60, unique=True)
#     username = models.CharField(max_length=30)
#     date_joined = models.DateTimeField(
#         verbose_name='date joined', auto_now_add=True)
#     last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
#     is_admin = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     is_superuser = models.BooleanField(default=False)