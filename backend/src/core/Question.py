from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import QAMessageSerializer
from rest_framework import status
from .models import *
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.forms.models import model_to_dict


class Question(APIView):
    serializer_class = QAMessageSerializer
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "question": openapi.Schema(type=openapi.TYPE_STRING)
            },
        ),
        operation_summary="Update a previously created question",
    )
    def put(self, request, stallId, postId, format=None):
        if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
        userId = request.user.userID
        message = get_object_or_404(QAMessages, pk=postId)
        if userId != message.author_id_id:
            return Response("Only Author can edit their question", status=status.HTTP_403_FORBIDDEN)
        message.question = request.data["question"]
        message.responder_id_id = userId

        serializer = QAMessageSerializer(message, data=model_to_dict(message))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
