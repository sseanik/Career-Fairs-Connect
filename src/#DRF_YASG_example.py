#DRF_YASG example
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


@swagger_auto_schema(request_body=SerializerName)

@swagger_auto_schema(request_body=openapi.Schema(
type=openapi.TYPE_OBJECT,
properties={
    'university_name': openapi.Schema(type=openapi.TYPE_STRING, description='max length 50\nnot null'),
    'university_abbreviation': openapi.Schema(type=openapi.TYPE_STRING, description='max length 10\nnot null'),
    'university_logo_url': openapi.Schema(type=openapi.TYPE_STRING, description='base64 image'),
    'university_site_url': openapi.Schema(type=openapi.TYPE_STRING, description='max length 150\n'),
    }))