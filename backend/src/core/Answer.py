from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import QAMessageSerializer
from rest_framework import status
from .models import *
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.forms.models import model_to_dict

# answer class for qna

class Answer(APIView):
    serializer_class = QAMessageSerializer
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "answer": openapi.Schema(type=openapi.TYPE_STRING)
            },
        ),
        operation_summary="Creates or updates an answer for a question",
    )
    # update answer
    def put(self, request, stallId, postId, format=None):
        if not request.data and request.data['answer']:
            return Response("Missing field 'answer'", status=400)
        if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
        if request.user.user_type != User.COMPANY:
            return Response("Only Company users can give answers", status=status.HTTP_403_FORBIDDEN)
        userId = request.user.userID
        # get current answer/message object
        message = get_object_or_404(QAMessages, pk=postId)
        message.answer = request.data["answer"]
        message.responder_id_id = userId

        # make sure format is correct
        serializer = QAMessageSerializer(message, data=model_to_dict(message))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
