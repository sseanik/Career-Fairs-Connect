import json
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from rest_framework.views import APIView, Response
from .models import CareerFairs, Universities
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404

<<<<<<< HEAD
# gets list of career fairs for students/companies
=======
>>>>>>> a16270bada02e9b7d7150b13db906830681844d2

class CareerFairListGlobal(APIView):
    @swagger_auto_schema(
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "id": openapi.Schema(type=openapi.TYPE_NUMBER),
                    "university": openapi.Schema(type=openapi.TYPE_STRING),
                    "start": openapi.Schema(type=openapi.TYPE_STRING),
                    "end": openapi.Schema(type=openapi.TYPE_STRING),
                    "title": openapi.Schema(type=openapi.TYPE_STRING),
                    "description": openapi.Schema(type=openapi.TYPE_STRING),
                    "webiste": openapi.Schema(type=openapi.TYPE_STRING),
                    "logo": openapi.Schema(type=openapi.TYPE_STRING),
                },
            ),
            401: "Unauthorized",
        },
        operation_summary="Get all career fairs",

    )
<<<<<<< HEAD

    # get all career fairs and their details
=======
    # need date qualification?
>>>>>>> a16270bada02e9b7d7150b13db906830681844d2
    def get(self, request):
        all_fairs = (
            CareerFairs.objects.order_by("-start_date")
            .select_related("university_id")
            .all()
            .values(
                "event_id",
                "title",
                "description",
                "start_date",
                "end_date",
                "university_id__university_name",
                "university_id__university_site_url",
                "university_id__university_logo_64",
            )
        )
        response_items = []
        for item in all_fairs:
            response_item = {
                "id": item["event_id"],
                "university": item["university_id__university_name"],
                "start": item["start_date"],
                "end": item["end_date"],
                "title": item["title"],
                "description": item["description"],
                "website": item["university_id__university_site_url"],
                "logo": item["university_id__university_logo_64"],
            }
            response_items.append(response_item)
        return HttpResponse(
            json.dumps([item for item in response_items], cls=DjangoJSONEncoder),
            content_type="application/json",
        )
