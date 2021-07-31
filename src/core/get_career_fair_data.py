from rest_framework import status
from rest_framework.response import Response
from .serializers import CareerFairSerializer
from .models import CareerFairs, Companies, Opportunities, Stalls, Universities, Presentations
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from django.forms.models import model_to_dict
from django.core import serializers 

@api_view(['GET', ])
def get_career_fair_data(request, eventId):
    if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
    careerFair = get_object_or_404(CareerFairs, pk=eventId)
    dict_obj = model_to_dict(careerFair)
    university = get_object_or_404(Universities, pk=dict_obj['university_id'])
    dict_obj.update(model_to_dict(university))
    stalls = list(Stalls.objects.filter(event_id__in=eventId).values())

    stalls_id_set = set()
    # for stall in stalls:
    

    for stall in stalls:
        # stall['company_details'] =
        # company = Companies.objects.filter(company_id__in=stall['company_id_id'])
        company = get_object_or_404(Companies, company_id=stall['company_id_id'])
        stall['company_details'] = model_to_dict(company)
        stalls_id_set.add(stall['stall_id'])
        # company_object['company_details'] = company
    stalls_list = list(stalls_id_set)

    try:
        presentations = Presentations.objects.filter(stall_id__in=stalls_list).values()
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    try:
        opportunities = Opportunities.objects.filter(stall_id__in=stalls_list).values()
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    presentations = list(presentations)
    dict_obj['stalls'] = stalls
    dict_obj['presentations'] =  presentations
    dict_obj['opportunities'] = opportunities
    return Response(dict_obj,status=status.HTTP_200_OK)
