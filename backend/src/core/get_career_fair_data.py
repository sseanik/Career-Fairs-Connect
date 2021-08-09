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
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


@swagger_auto_schema(
    method="get",
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "university": openapi.Schema(type=openapi.TYPE_STRING),
                "start": openapi.Schema(type=openapi.TYPE_STRING),
                "end": openapi.Schema(type=openapi.TYPE_STRING),
                "title": openapi.Schema(type=openapi.TYPE_STRING),
                "description": openapi.Schema(type=openapi.TYPE_STRING),
                "website": openapi.Schema(type=openapi.TYPE_STRING),
                "logo": openapi.Schema(type=openapi.TYPE_STRING),
                "stalls": openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(
                        type="id, approval_status, company, logo, live"
                    ),
                ),
                "presentations": openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(
                        type="id, title, start, end, description, link, color, textColor, borderColor"
                    ),
                ),
                "opportunities": openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(
                        type="id, company, type, role, location, wam, expiry, link, description"
                    ),
                ),
            },
        ),
        401: "Unauthorized",
        404: "Not found",
    },
    operation_summary="Get all stalls and stall data for a career fair",
    operation_description="Returns a set of all stalls for a career fair, including fields for the company hosted stalls, opportunities and presentations",
)
@api_view(
    [
        "GET",
    ]
)

# get all the data of a particlar stall
def get_career_fair_data(request, eventId):
    if not request.user.is_authenticated:
        return Response(
            "Please pass Token in the Authorisation header",
            status=status.HTTP_401_UNAUTHORIZED,
        )
    careerFair = get_object_or_404(CareerFairs, pk=eventId)
    career_fair_dict = model_to_dict(careerFair)
    university = get_object_or_404(Universities, pk=career_fair_dict["university_id"])
    career_fair_dict.update(model_to_dict(university))

    # rename fields to fit frontend requirements and ordering sakes
    return_dict = {
        "university": career_fair_dict["university_name"],
        "start": career_fair_dict["start_date"],
        "end": career_fair_dict["end_date"],
        "title": career_fair_dict["title"],
        "description": career_fair_dict["description"],
        "website": career_fair_dict["university_site_url"],
        "logo": career_fair_dict["university_logo_64"],
    }
    
    # check type of user, return different information based off it
    if request.user.user_type == User.STUDENT:
        stalls = list(
            Stalls.objects.filter(event_id=eventId, approval_status="Approved").values()
        )
    elif request.user.user_type == User.COMPANY:
        company = get_object_or_404(Companies, user_id=request.user.userID)

        stalls = list(
            Stalls.objects.filter(
                Q(event_id=eventId),
                Q(company_id=company.company_id) | Q(approval_status="Approved"),
            ).values()
        )
    # university so return all stalls regardless of status
    else:
        stalls = list(Stalls.objects.filter(event_id=eventId).values())

    stalls_id_set = set()

    # prepare stall data
    for i, stall in enumerate(stalls):
        # print(stall)
        stall_presentations = list(
            Presentations.objects.filter(stall_id=stall["stall_id"])
        )
        # check if presentation occur for stall
        stall["live"] = False
        for presentation in stall_presentations:
            tmp_dict = model_to_dict(presentation)
            if (
                timezone.now() > tmp_dict["start_time"]
                and timezone.now() < tmp_dict["end_time"]
            ):
                stall["live"] = True

        company = get_object_or_404(Companies, company_id=stall["company_id_id"])
        company_dict = model_to_dict(company)
        stall.update(company_dict)
        stalls_id_set.add(stall["stall_id"])
        stalls[i] = {
            "id": stall["stall_id"],
            "approval_status": stall["approval_status"],
            "company": stall["company_name"],
            "logo": stall["company_logo_64"],
            "live": stall["live"],
            "description": stall["company_description"],
        }

    stalls_list = list(stalls_id_set)

    # get list of presentations for all stalls in event
    try:
        presentations = list(
            Presentations.objects.filter(stall_id__in=stalls_list).values()
        )
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    for i, presentation in enumerate(presentations):
        # get company hosting presentation
        stall = get_object_or_404(Stalls, pk=presentation["stall_id_id"])
        company = get_object_or_404(Companies, pk=model_to_dict(stall)["company_id"])
        presentations[i] = {
            "id": presentation["presentation_id"],
            "title": presentation["title"],
            "start": presentation["start_time"],
            "end": presentation["end_time"],
            "description": presentation["presentation_description"],
            "link": presentation["presentation_link"],
            "company": company.company_name,
            "color": presentation["color"],
            "textColor": presentation["textColor"],
            "borderColor": presentation["borderColor"],
        }

    try:
        opportunities = list(
            Opportunities.objects.filter(stall_id__in=stalls_list).values()
        )
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    for i, opportunity in enumerate(opportunities):
        # get company hosting opportunities
        stall = get_object_or_404(Stalls, pk=opportunity["stall_id_id"])
        company = get_object_or_404(Companies, pk=model_to_dict(stall)["company_id"])
        opportunities[i] = {
            "id": opportunity["job_id"],
            "company": company.company_name,
            "type": opportunity["type"],
            "role": opportunity["role"],
            "location": opportunity["location"],
            "wam": opportunity["wam"],
            "expiry": opportunity["expiry"],
            "link": opportunity["application_link"],
            "description": opportunity["job_description"],
        }

    return_dict["stalls"] = stalls
    return_dict["presentations"] = presentations
    return_dict["opportunities"] = opportunities
    return Response(return_dict, status=status.HTTP_200_OK)
