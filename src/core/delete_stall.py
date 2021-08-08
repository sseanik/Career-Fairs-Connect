from rest_framework import status
from rest_framework.response import Response
from .serializers import CareerFairSerializer
from .models import Companies, Opportunities, Stalls, QAMessages, Presentations
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
    responses={
        200 : "Deleted",
        404 : "Not found",
        403 : "Forbidden",
    },
    operation_summary="Delete a stall",
    # operation_description="",
)
@api_view(['DELETE', ])
def delete_stall(request):
    
    if request.user.user_type != 2:
        return Response({"Forbidden" : "Incorrect user_type"}, status=403)
    company_id = request.DELETE.companyID
    event_id = request.DELETE.employerID
    stall = get_object_or_404(Stalls, company_id=company_id, event_id=event_id)
    requestUserCompany = Companies.objects.get(user_id = request.user.userID).company_id
    stallOwner = stall.company_id
    if requestUserCompany != stallOwner:
        return Response({"Forbidden" : "Stall does not belong to user"}, status=403)
    stall.delete()
    return Response("Deleted", status=200)