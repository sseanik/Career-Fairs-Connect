from rest_framework.views import Response
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from django.core.serializers import serialize
from django.http import HttpResponse
from .models import *
import json
from django.core.serializers.json import DjangoJSONEncoder
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated


@swagger_auto_schema(method="get",
    responses={
        200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
            "presentation_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "stall_id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "title": openapi.Schema(type=openapi.TYPE_STRING),
            "colour": openapi.Schema(type=openapi.TYPE_STRING),
            "presentation_link": openapi.Schema(type=openapi.TYPE_STRING),
            "start_time": openapi.Schema(type=openapi.TYPE_STRING),
            "end_time": openapi.Schema(type=openapi.TYPE_STRING),
            "presentation_description": openapi.Schema(type=openapi.TYPE_STRING),
        }),  
        404: "Not found",
    },
    operation_summary="Get all presentations for careerfair",
    # operation_description="",
)
@api_view(['GET', ])
def get_all_presentations(request, eventId):
    try:
        stalls = Stalls.objects.filter(event_id=eventId)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    stalls_set = set()
    for stall in stalls:
        stalls_set.add(stall.stall_id)
    
    stalls_list = list(stalls_set)
    try:
        presentations = Presentations.objects.filter(stall_id__in=stalls_list).values()
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = json.dumps(list(presentations),cls=DjangoJSONEncoder)

    # data = serialize("json", presentations, fields=('presentation_id', 'stall_id', 'presentation_link','datetime','presentation_description', 'title', 'color'))       

    return HttpResponse(data, content_type="application/json")
 
@swagger_auto_schema(method="get",
    responses={
            200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
            "presentations": openapi.Schema(type=openapi.TYPE_ARRAY,items=openapi.Items(type="stall_id, start_time,end_time, presentation_link, presentation_description, title, color")),   
            404: "Not found",
        })
    },
    operation_summary="Get presentation for stall",
    # operation_description="",
)
@api_view(['GET', ])
def get_presentation(request, stallId):
    print(stallId)
    try:
        presentation = Presentations.objects.get(stall_id=stallId)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    presentation_serializer = PresentationSerializer(presentation, fields=('stall_id','start_time','end_time', 'presentation_link', 'presentation_description', 'title', 'color'))
    return Response(presentation_serializer.data, status=status.HTTP_201_CREATED)   
    
@swagger_auto_schema(method="post", request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'stall_id': openapi.Schema(type=openapi.TYPE_NUMBER),
        'start_time': openapi.Schema(type=openapi.TYPE_STRING),
        'end_time': openapi.Schema(type=openapi.TYPE_STRING),
        'presentation_description': openapi.Schema(type=openapi.TYPE_STRING),
        'presentation_link': openapi.Schema(type=openapi.TYPE_STRING),
        'title': openapi.Schema(type=openapi.TYPE_STRING),
        'color': openapi.Schema(type=openapi.TYPE_STRING),
        }),
    responses={
        201: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'stall_id': openapi.Schema(type=openapi.TYPE_NUMBER),
                'start_time': openapi.Schema(type=openapi.TYPE_STRING),
                'end_time': openapi.Schema(type=openapi.TYPE_STRING),
                'presentation_description': openapi.Schema(type=openapi.TYPE_STRING),
                'presentation_link': openapi.Schema(type=openapi.TYPE_STRING),
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'color': openapi.Schema(type=openapi.TYPE_STRING),
        }),  
        400: "Bad request",
        403: "Permission denied"
    },
    operation_summary="Create presentation",
    # operation_description="",
)
@api_view(['POST', ])
def create_presentation(request):
    if request.user.user_type != 2:
        return Response({"Forbidden" : "Incorrect user_type"}, status=403)
    requestUserCompany = Companies.objects.get(user_id = request.user.userID).company_id
    opportunityOwner = Stalls.objects.get(stall_id = request.data['stall_id']).company_id.company_id
    if requestUserCompany != opportunityOwner:
        return Response({"Forbidden" : "Stall does not belong to user"}, status=403)
    presentation_serializer = PresentationSerializer(data=request.data, fields=('stall_id','start_time','end_time', 'presentation_link', 'presentation_description', 'title', 'color'))
    
    if not presentation_serializer.is_valid():
        return Response(presentation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    presentation_serializer.save()
    return Response(presentation_serializer.data, status=status.HTTP_201_CREATED)   



@swagger_auto_schema(method="put", request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'presentation_id': openapi.Schema(type=openapi.TYPE_NUMBER),
        'stall_id': openapi.Schema(type=openapi.TYPE_NUMBER),
        'start_time': openapi.Schema(type=openapi.TYPE_STRING),
        'end_time': openapi.Schema(type=openapi.TYPE_STRING),
        'presentation_description': openapi.Schema(type=openapi.TYPE_STRING),
        'presentation_link': openapi.Schema(type=openapi.TYPE_STRING),
        'title': openapi.Schema(type=openapi.TYPE_STRING),
        'color': openapi.Schema(type=openapi.TYPE_STRING),
        },
    responses={
        201: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'presentation_id': openapi.Schema(type=openapi.TYPE_NUMBER),
                'stall_id': openapi.Schema(type=openapi.TYPE_NUMBER),
                'start_time': openapi.Schema(type=openapi.TYPE_STRING),
                'end_time': openapi.Schema(type=openapi.TYPE_STRING),
                'presentation_description': openapi.Schema(type=openapi.TYPE_STRING),
                'presentation_link': openapi.Schema(type=openapi.TYPE_STRING),
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'color': openapi.Schema(type=openapi.TYPE_STRING),
        }),
        400: "Bad request",
        403: "Permission denied"
    })
    ,
    operation_summary="Update presentation",
    operation_description="Update an opportunity, can alter the assigned stall to undefined (Beware!), omit stall_id if possible. Presentation must be owned by caller.",
)
@api_view(['PUT', ])
def edit_presentation(request):
    if request.user.user_type != 2:
        return Response({"Forbidden" : "Incorrect user_type"}, status=403)
    requestUserCompany = Companies.objects.get(user_id = request.user.userID).company_id
    opportunityOwner = Stalls.objects.get(stall_id = request.data['stall_id']).company_id.company_id
    if requestUserCompany != opportunityOwner:
        return Response({"Forbidden" : "Stall does not belong to user"}, status=403)
    try:
        presentation = Presentations.objects.get(presentation_id=request.data['presentation_id'])
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    presentation_serializer = PresentationSerializer(presentation, data=request.data, fields=('presentation_id','stall_id','start_time','end_time', 'presentation_link', 'presentation_description', 'title', 'color'))
    if not presentation_serializer.is_valid():
        return Response(presentation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    presentation_serializer.save()
    return Response(presentation_serializer.data, status=status.HTTP_201_CREATED)
    
    
@swagger_auto_schema(
    method="delete",
    responses={
        200 : "Deleted",
        404 : "Not found",
        403 : "Forbidden",
    },
    operation_summary="Delete presentation",
    # operation_description="",
)
@api_view(['DELETE', ])
def delete_presentation(self, request, presentationId):
    if request.user.user_type != "2":
        return Response({"Forbidden" : "Incorrect user_type"}, status=403)
    requestUserCompany = Companies.objects.get(user_id = request.user.userID).company_id
    presentation = get_object_or_404(Presentations, pk = presentationId)
    presentationOwner = presentation.stall_id.company_id
    if requestUserCompany != presentationOwner:
        return Response({"Forbidden" : "Presentation does not belong to user"}, status=403)
    presentation.delete()
    return Response("Deleted", status=200)