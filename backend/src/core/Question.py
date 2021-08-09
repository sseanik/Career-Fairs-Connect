from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import QAMessageSerializer
from rest_framework import status
from .models import *
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.forms.models import model_to_dict
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated


class Question(APIView):
    serializer_class = QAMessageSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={"question": openapi.Schema(type=openapi.TYPE_STRING)},
        ),
        operation_summary="Update a previously created question",
    )
    def put(self, request, stallId, postId, format=None):
        # request must contain body with question field as this is the only field update permissible
        if not request.data and not request.data["question"]:
            return Response("Missing field 'question'", status=400)
        if not request.user.is_authenticated:
            return Response(
                "Please pass Token in the Authorisation header",
                status=status.HTTP_401_UNAUTHORIZED,
            )
        # check user ownership of question (ownership required to edit)
        userId = request.user.userID
        message = get_object_or_404(QAMessages, pk=postId)
        if userId != message.author_id_id:
            return Response(
                "Only Author can edit their question", status=status.HTTP_403_FORBIDDEN
            )
        message.question = request.data["question"]
        message.responder_id_id = userId
        serializer = QAMessageSerializer(message, data=model_to_dict(message))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: "Deleted", 403: "Forbidden", 404: "Not found"},
        operation_summary="Delete question",
        operation_description="Question must be posted by caller or 403 - deletions cascade to question answers",
    )
    def delete(self, request, stallId, postId, format=None):
        questionObj = get_object_or_404(QAMessages, pk=postId)
        if questionObj.author_id.userID != request.user.userID:
            return Response(
                {"Forbidden": "Only the question owner can call for deletion"},
                status=403,
            )
        questionObj.delete()
        return Response("Deleted", status=200)
