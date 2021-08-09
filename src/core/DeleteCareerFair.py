import json
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from rest_framework.views import APIView, Response
from .models import CareerFairs, Universities
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated


class DeleteCareerFair(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: "deleted",
            401: "Unauthorized",
            403: "Forbidden (permission denied)",
        },
        operation_summary="Delete career fair",
        operation_description="Delete career fairs specified at endpoint. Deletion cascades to all stalls, applications & approvals, opportunities, presentations etc",
    )
    def delete(self, request, eventId, *args, **kwargs):
        if request.user.user_type != 1:
            return Response({"Forbidden": "Incorrect user_type"}, status=403)
        careerfair = get_object_or_404(CareerFairs, pk=eventId)
        requestUserUniversity = careerfair.university_id.university_id
        careerFairOwner = CareerFairs.objects.get(
            event_id=eventId).university_id.university_id
        if requestUserUniversity != careerFairOwner:
            return Response({"Forbidden": "Stall does not belong to user"}, status=403)
        # deletion cascades to all stalls, applications & approvals, opportunities, presentations etc
        careerfair.delete()
        return Response("deleted", status=200)
