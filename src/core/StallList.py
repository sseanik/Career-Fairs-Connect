from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import StallsSerializer


class StallList(APIView):
    def post(self, request, eventId, format=None):
        serializer = StallsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)