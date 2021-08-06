import json
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from rest_framework.views import APIView
from .models import CareerFairs


class CareerFairListGlobal(APIView):
    def get(self, request):
        all_fairs = CareerFairs.objects.select_related("university_id")\
            .all().values('event_id', 'title','description', 'start_date', 'end_date',
                          'university_id__university_name', 'university_id__university_site_url',
                          'university_id__university_logo_64')
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

# class CareerFairs(APIView):
#     def get(self, request, *args, **kwargs):
#         # only events currentlyhappening or in the future
#         now = datetime.datetime.now()
#         #[:20] first 20 in dataset
#         eventData = Events.objects.filter(event_end_time__gt=now).order_by('-event_start_time')
#         serializer = EventSerializer(eventData, many=True)
#         return Response(serializer.data, status=200)
        
