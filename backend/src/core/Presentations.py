from rest_framework.views import Response
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from django.core.serializers import serialize
from django.http import HttpResponse
import json
from django.core.serializers.json import DjangoJSONEncoder

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
    # presentations_list = list(presentations)
    data = json.dumps(list(presentations),cls=DjangoJSONEncoder)

    # data = serialize("json", presentations, fields=('presentation_id', 'stall_id', 'presentation_link','datetime','presentation_description'))       
    return HttpResponse(data, content_type="application/json")
 

@api_view(['GET', ])
def get_presentation(request, stallId):
    print(stallId)
    try:
        presentation = Presentations.objects.get(stall_id=stallId)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    presentation_serializer = PresentationSerializer(presentation, fields=('stall_id','datetime', 'presentation_link', 'presentation_description'))
    return Response(presentation_serializer.data, status=status.HTTP_201_CREATED)   

@api_view(['POST', ])
def create_presentation(request):
    presentation_serializer = PresentationSerializer(data=request.data, fields=('stall_id','datetime', 'presentation_link', 'presentation_description'))
    
    if not presentation_serializer.is_valid():
        return Response(presentation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    presentation_serializer.save()
    return Response(presentation_serializer.data, status=status.HTTP_201_CREATED)   

@api_view(['PUT', ])
def edit_presentation(request):
    try:
        presentation = Presentations.objects.get(stall_id=request.data['stall_id'])
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    presentation_serializer = PresentationSerializer(presentation, data=request.data, fields=('stall_id','datetime', 'presentation_link', 'presentation_description'))
    if not presentation_serializer.is_valid():
        return Response(presentation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    presentation_serializer.save()
    return Response(presentation_serializer.data, status=status.HTTP_201_CREATED)   