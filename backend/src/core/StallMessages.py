from django.http import HttpResponse
import json
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import QAMessageSerializer
from rest_framework import status
from .models import *
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class StallMessages(APIView):
    serializer_class = QAMessageSerializer

    @swagger_auto_schema(
        responses={
            200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
            "post_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "author_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "parent_post_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "time": openapi.Schema(type=openapi.TYPE_NUMBER),
            "content": openapi.Schema(type=openapi.TYPE_NUMBER),
            "already_upvoted_by_this_user": openapi.Schema(type=openapi.TYPE_BOOLEAN),
            "num_upvotes": openapi.Schema(type=openapi.TYPE_NUMBER),
            }),
            400 : "Not found",
        },
        operation_summary="Get Q&A messages for stall",
        # operation_description="",
    )
    def get(self, request, stallId, format=None):
        if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
        get_object_or_404(Stalls, pk=stallId)

        messages = QAMessages.objects.filter(stall_id=stallId).values()
        response_items = []
        for item in messages:
            postid = item['post_id']
            upvote = Upvotes.objects.filter(user_id=request.user.userID, post_id=postid)
            already_upvoted_by_this_user = False
            if upvote:
                already_upvoted_by_this_user = True
            response_item = {
                'post_id': item['post_id'],
                'author_id': item['author_id_id'],
                'responder_id': item['responder_id_id'],
                'time': item['time'].timestamp(),
                'question': item['question'],
                'answer': item['answer'],
                'already_upvoted_by_this_user': already_upvoted_by_this_user,
                "num_upvotes": item["num_upvotes"]
            }
            response_items.append(response_item)
        return HttpResponse(json.dumps([item for item in response_items], cls=DjangoJSONEncoder), content_type='application/json')


    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "question": openapi.Schema(type=openapi.TYPE_STRING)
            },
        ),
        operation_summary="Creates a question to the company",
    )
    def post(self, request, stallId, format=None):
        if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
        userId = request.user.userID
        get_object_or_404(Stalls, pk=stallId)
        request.data['author_id'] = userId
        request.data['stall_id'] = stallId

        serializer = QAMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

