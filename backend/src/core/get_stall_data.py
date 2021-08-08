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
    method="get",
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "fairID": openapi.Schema(type=openapi.TYPE_NUMBER),
                "company": openapi.Schema(type=openapi.TYPE_STRING),
                "logo": openapi.Schema(type=openapi.TYPE_STRING),
                "website": openapi.Schema(type=openapi.TYPE_STRING),
                "live": openapi.Schema(type=openapi.TYPE_BOOLEAN),
                "opportunities": openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(
                        type="id, type, role, location, wam, expiry, link ,description"
                    ),
                ),
                "presentations": openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(
                        type="id, title, start, end, description, link, color, textColor, live"
                    ),
                ),
                "qandas": openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(type="id, question, answer"),
                ),
            },
        ),
        401: "Unauthorized",
    },
    operation_summary="Get detailed stall data",
    operation_description="Get stall data and context including associated opportunities, presentations and Q&A - Required for loading detailed stall view",
)
@api_view(
    [
        "GET",
    ]
)
def get_stall_data(request, stallId):
    if not request.user.is_authenticated:
        return Response(
            "Please pass Token in the Authorisation header",
            status=status.HTTP_401_UNAUTHORIZED,
        )

    stall_object = get_object_or_404(Stalls, pk=stallId)
    tmp_dict = model_to_dict(stall_object)
    company_object = get_object_or_404(Companies, pk=tmp_dict["company_id"])
    tmp_dict.update(model_to_dict(company_object))

    # make api neater
    return_dict = {
        "fairID": tmp_dict["event_id"],
        "company": tmp_dict["company_name"],
        "logo": tmp_dict["company_logo_64"],
        "website": tmp_dict["company_webpage_url"],
        "live": False,
        "approval_status": tmp_dict["approval_status"],
        "description": tmp_dict["company_description"],
    }

    presentations = list(Presentations.objects.filter(stall_id=stallId).values())
    for i, presentation in enumerate(presentations):
        presentations[i] = {
            "id": presentation["presentation_id"],
            "title": presentation["title"],
            "start": presentation["start_time"],
            "end": presentation["end_time"],
            "description": presentation["presentation_description"],
            "link": presentation["presentation_link"],
            "color": presentation["color"],
            "textColor": presentation["textColor"],
            "live": False,
        }

        if (
            timezone.now() > presentation["start_time"]
            and timezone.now() < presentation["end_time"]
        ):
            presentations[i]["live"] = True
            return_dict["live"] = True

    opportunities = list(Opportunities.objects.filter(stall_id=stallId).values())
    for i, opportunity in enumerate(opportunities):
        opportunities[i] = {
            "id": opportunity["job_id"],
            "type": opportunity["type"],
            "role": opportunity["role"],
            "location": opportunity["location"],
            "wam": opportunity["wam"],
            "expiry": opportunity["expiry"],
            "link": opportunity["application_link"],
            "description": opportunity["job_description"],
        }

    QAmessages = list(QAMessages.objects.filter(stall_id=stallId).values())

    for i, QAmessage in enumerate(QAmessages):
        QAmessages[i] = {
            "id": QAmessage["post_id"],
            "question": QAmessage["question"],
            "answer": QAmessage["answer"],
        }

    return_dict["opportunities"] = opportunities
    return_dict["presentations"] = presentations
    return_dict["qandas"] = QAmessages

    return Response(return_dict, status=status.HTTP_200_OK)
