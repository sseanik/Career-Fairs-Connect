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
    if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
    careerFair = get_object_or_404(CareerFairs, pk=eventId)
    career_fair_dict = model_to_dict(careerFair)
    university = get_object_or_404(Universities, pk=career_fair_dict['university_id'])
    career_fair_dict.update(model_to_dict(university))

    # rename fields to fit frontend requirements and ordering sakes
    return_dict = {
        "university": career_fair_dict["university_name"],
        "start": career_fair_dict["start_date"],
        "end": career_fair_dict["end_date"],
        "title": career_fair_dict["title"],
        "description": career_fair_dict["description"],
        "website": career_fair_dict["university_site_url"],
        "logo": career_fair_dict["university_logo_64"]
    }

    # student token: Token 094788c5ceb4196699c1d48e573a350ddc1d47c9
    # uni token: Token 5b4b9e769b98553502f6e7184d3faaf592b90b2e
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
    

    for i,stall in enumerate(stalls):
        # print(stall)
        stall_presentations = list(Presentations.objects.filter(stall_id=stall["stall_id"]))
        stall["live"] = False
        for presentation in stall_presentations:
            tmp_dict = model_to_dict(presentation)
            # print(tmp_dict['start_time'])
            # print(tmp_dict['end_time'])
            if (timezone.now() > tmp_dict['start_time'] and timezone.now() < tmp_dict['end_time']):
                stall["live"] = True
        # stall['company_details'] =
        # company = Companies.objects.filter(company_id__in=stall['company_id_id'])
        company = get_object_or_404(Companies, company_id=stall['company_id_id'])
        company_dict = model_to_dict(company)
        stall.update(company_dict)
        stalls_id_set.add(stall['stall_id'])
        stalls[i] = {
            "id": stall["stall_id"],
            "approval_status": stall["approval_status"],
            "company": stall["company_name"],
            "description": stall["stall_description"],
            "logo": stall["company_logo_64"],
            "live": stall["live"]
        }





        # company_object['company_details'] = company
    stalls_list = list(stalls_id_set)

    try:
        presentations = list(Presentations.objects.filter(stall_id__in=stalls_list).values())
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    for i,presentation in enumerate(presentations):
        # get company hosting presentation
        stall = get_object_or_404(Stalls, pk=presentation['stall_id_id'])
        company = get_object_or_404(Companies,pk=model_to_dict(stall)["company_id"])
        presentations[i] = {
            "id": presentation["presentation_id"],
            "title": presentation["title"],
            "start": presentation["start_time"],
            "end": presentation["end_time"],
            "description": presentation["presentation_description"],
            "link": presentation["presentation_link"],
            "company": company.company_name,
            "color": presentation["color"],
        }

    
    try:
        opportunities = list(Opportunities.objects.filter(stall_id__in=stalls_list).values())
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    for i,opportunity in enumerate(opportunities):
        # get company hosting opportunities
        stall = get_object_or_404(Stalls, pk=opportunity['stall_id_id'])
        company = get_object_or_404(Companies,pk=model_to_dict(stall)["company_id"])
        opportunities[i] = {
            "id": opportunity["job_id"],
            "company": company.company_name,    
            "type": opportunity["type"],
            "role": opportunity["role"], 
            "location": opportunity["location"], 
            "wam": opportunity["wam"], 
            "expiry": opportunity["expiry"], 
            "link": opportunity["application_link"],
            "description": opportunity["job_description"]
        }



    return_dict['stalls'] = stalls
    return_dict['presentations'] =  presentations
    return_dict['opportunities'] = opportunities
    return Response(return_dict,status=status.HTTP_200_OK)

