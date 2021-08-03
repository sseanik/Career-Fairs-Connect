from rest_framework import status
from rest_framework.response import Response
from .serializers import CareerFairSerializer
from .models import *
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from django.forms.models import model_to_dict
from django.core import serializers 
from django.utils import timezone
from django.db.models import Q
from django.contrib.auth.hashers import make_password


@api_view(['GET', ])
def get_career_fair_data(request, eventId):
    print(make_password("a"))
    if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
    careerFair = get_object_or_404(CareerFairs, pk=eventId)
    return_dict = model_to_dict(careerFair)
    university = get_object_or_404(Universities, pk=return_dict['university_id'])
    return_dict.update(model_to_dict(university))

    # rename fields to fit frontend requirements and ordering sakes
    return_dict["university"] = return_dict.pop("university_name", "")
    return_dict["start"] = return_dict.pop("start_date", "")
    return_dict["end"] = return_dict.pop("end_date", "")
    return_dict["title"] = return_dict.pop("title", "")
    return_dict["description"] = return_dict.pop("description", "")
    return_dict["website"] = return_dict.pop("university_site_url", "")
    return_dict["logo"] = return_dict.pop("university_logo_64", "")
    return_dict.pop('event_id','')
    return_dict.pop('university_abbreviation','')
    return_dict.pop('university_id','')
    return_dict.pop('user_id','')

    # student token: Token 094788c5ceb4196699c1d48e573a350ddc1d47c9
    # uni token:
    # company token (rejected): Token 8e8f0363827874654f7d5a56f2136bd76ecc7cc2
    # company token (accepted): Token 1548e60f044c132da92a2810d0643312ea6b2418
    if (request.user.user_type == User.STUDENT):
        stalls = list(Stalls.objects.filter(event_id__in=eventId, approval_status="Approved").values())
    elif (request.user.user_type == User.COMPANY):
        company = get_object_or_404(Companies, user_id=request.user.userID)
        stalls = list(Stalls.objects.filter(Q(event_id__in=eventId),Q(company_id=company.company_id) | Q(approval_status="Approved")).values())
    # university so return all stalls regardless of status
    else:
        stalls = list(Stalls.objects.filter(event_id__in=eventId).values())
        pass


    stalls_id_set = set()
    # for stall in stalls:
    

    for stall in stalls:
        # stall['company_details'] =
        # company = Companies.objects.filter(company_id__in=stall['company_id_id'])
        company = get_object_or_404(Companies, company_id=stall['company_id_id'])
        company_dict = model_to_dict(company)
        stall.update(company_dict)
        stalls_id_set.add(stall['stall_id'])
        stall["id"] = stall.pop("stall_id", "")
        stall["company"] = stall.pop("company_name", "")
        stall["description"] = stall.pop("stall_description", "")
        stall["logo"] = stall.pop("company_logo_64", "")
        # TODO
        stall["live"] = False
        stall_presentations = list(Presentations.objects.filter(stall_id=stall["id"]))
        for presentation in stall_presentations:
            tmp_dict = model_to_dict(presentation)
            # print(tmp_dict['start_time'])
            # print(tmp_dict['end_time'])
            if (timezone.now() > tmp_dict['start_time'] and timezone.now() < tmp_dict['end_time']):
                stall["live"] = True

        # except:
        #     pass

        stall.pop("company_id_id", "")
        stall.pop("event_id_id", "")
        stall.pop("company_id", "")
        stall.pop("user_id", "")
        stall.pop("company_description", "")
        stall.pop("company_webpage_url", "")


        # company_object['company_details'] = company
    stalls_list = list(stalls_id_set)

    try:
        presentations = Presentations.objects.filter(stall_id__in=stalls_list).values()
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    for presentation in presentations:
        presentation["id"] = presentation.pop("presentation_id", "")
        presentation["start"] = presentation.pop("start_time", "")
        presentation["end"] = presentation.pop("end_time", "")
        presentation["description"] = presentation.pop("presentation_description", "")
        presentation["link"] = presentation.pop("presentation_link", "")
        # get company hosting presentation
        stall = get_object_or_404(Stalls, pk=presentation['stall_id_id'])
        company = get_object_or_404(Companies,pk=model_to_dict(stall)["company_id"])
        presentation["company"] = company.company_name
        presentation.pop("stall_id_id", "")
    
    try:
        opportunities = Opportunities.objects.filter(stall_id__in=stalls_list).values()
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    for opportunity in opportunities:
        opportunity["id"] = opportunity.pop("job_id", "")
        opportunity["link"] = opportunity.pop("application_link", "")
        opportunity["description"] = opportunity.pop("job_description", "")
        # get company hosting opportunities
        stall = get_object_or_404(Stalls, pk=opportunity['stall_id_id'])
        company = get_object_or_404(Companies,pk=model_to_dict(stall)["company_id"])
        opportunity["company"] = company.company_name
        opportunity.pop("stall_id_id", "")


    return_dict['stalls'] = stalls
    return_dict['presentations'] =  presentations
    return_dict['opportunities'] = opportunities
    return Response(return_dict,status=status.HTTP_200_OK)
