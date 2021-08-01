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

@api_view(['GET', ])
def get_stall_data(request, stallId):
    # if not request.user.is_authenticated:
    #         return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
    
    stall_object = get_object_or_404(Stalls, pk=stallId)
    ret_object = model_to_dict(stall_object)
    company_object = get_object_or_404(Companies, pk=ret_object['company_id'])
    ret_object.update(model_to_dict(company_object))

    opportunities = Opportunities.objects.filter(stall_id__in=[stallId]).values()
    presentations = Presentations.objects.filter(stall_id__in=[stallId]).values()
    QAmessages = QAMessages.objects.filter(stall_id__in=[stallId]).values()
    ret_object["opportunities"] = opportunities
    ret_object["presentations"] = presentations 
    ret_object["qandas"] = QAmessages
    return Response(ret_object,status=status.HTTP_200_OK)
