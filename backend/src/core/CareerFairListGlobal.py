import json
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from rest_framework.views import APIView
from .models import CareerFairs
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

class CareerFairListGlobal(APIView):
    @swagger_auto_schema(
    responses={
        200 : openapi.Schema(type=openapi.TYPE_OBJECT,properties={
            "id": openapi.Schema(type=openapi.TYPE_NUMBER),
            "university": openapi.Schema(type=openapi.TYPE_STRING),
            "start": openapi.Schema(type=openapi.TYPE_STRING),
            "end": openapi.Schema(type=openapi.TYPE_STRING),
            "title": openapi.Schema(type=openapi.TYPE_STRING),
            "description": openapi.Schema(type=openapi.TYPE_STRING),
            "webiste": openapi.Schema(type=openapi.TYPE_STRING),
            "logo": openapi.Schema(type=openapi.TYPE_STRING),
            }),
        401 : "Unauthorized"
    })
    def get(self, request):
        all_fairs = CareerFairs.objects.select_related("university_id")\
            .all().values('event_id', 'title','description', 'start_date', 'end_date', 'university_id__university_site_url', 'university_id__university_logo_64')
        response_items = []
        for item in all_fairs:
            response_item = {
                'id': item['event_id'],
                'university': item['university_id__university_name'],
                'start': item['start_date'].timestamp(),
                'end': item['end_date'].timestamp(),
                'title': item['title'],
                'description': item['description'],
                'website': item['university_id__university_site_url'],
                'logo': item['university_id__university_logo_64']
            }
            response_items.append(response_item)
        return HttpResponse(json.dumps([item for item in response_items], cls=DjangoJSONEncoder), content_type='application/json')

# REVIEW REQUIRED, Thornton replaced logo_url with logo_64 & removed ref to univ_abbreviations
        
