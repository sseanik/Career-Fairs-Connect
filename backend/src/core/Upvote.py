from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import UpvoteSerializer
from rest_framework import status
from .models import *
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema

class Upvote(APIView):

    @swagger_auto_schema(request_body=UpvoteSerializer)
    def post(self, request, stallId, postId, format=None):
        if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
        userId = request.user.userID
        get_object_or_404(Stalls, pk=stallId)
        message = get_object_or_404(QAMessages, pk=postId)

        current_upvote = Upvotes.objects.filter(user_id=userId, post_id=postId)
        if not current_upvote:
            new_upvote = {'user_id': userId, 'post_id':postId}
            serializer = UpvoteSerializer(data=new_upvote)
            if serializer.is_valid():
                serializer.save()
                message.num_upvotes += 1
                message.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

        return Response('Already upvoted', status=status.HTTP_200_OK)

    def delete(self, request, stallId, postId, format=None):
        if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
        userId = request.user.userID
        get_object_or_404(Stalls, pk=stallId)
        message = get_object_or_404(QAMessages, pk=postId)

        current_upvote = Upvotes.objects.filter(user_id=userId, post_id=postId)
        if current_upvote:
            current_upvote.delete()
            message.num_upvotes -= 1
            message.save()
        return Response('Upvote removed', status=status.HTTP_200_OK)

