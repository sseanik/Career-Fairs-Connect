from rest_framework import status
from rest_framework.response import Response
from .serializers import CareerFairSerializer
from .models import Companies, Opportunities, Stalls, QAMessages, Presentations
from django.http import QueryDict
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from django.forms.models import model_to_dict
from django.core import serializers
from django.utils import timezone
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


@swagger_auto_schema(
    method="delete",
    request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'eventID': openapi.Schema(type=openapi.TYPE_NUMBER, description='event ID'),
        'employerID': openapi.Schema(type=openapi.TYPE_NUMBER, description='employer ID'),
        }),
    responses={
        200 : "Stall deleted",
        404 : "Not found",
        403 : "Forbidden",
    },
    operation_summary="Delete a stall",
    # operation_description="",
)
@api_view(
    [
        "DELETE",
    ]
)
def delete_stall(request):

    if request.user.user_type != 2:
        return Response({"Forbidden": "Incorrect user_type"}, status=403)
    delete = json.loads(request.body)
    event_id = delete["eventID"]
    company_id = delete["employerID"]
    stall = get_object_or_404(Stalls, company_id=company_id, event_id=event_id)

    requestUserCompany = Companies.objects.get(user_id=request.user.userID).company_id
    stallOwner = stall.company_id.company_id

    if requestUserCompany != stallOwner:
        return Response({"Forbidden": "Stall does not belong to user"}, status=403)
    stall.delete()
    return Response("Deleted", status=200)