import json
from django.http import HttpResponse
from .models import Car
from .models import api_test
from api.serializers import CarSerializer
from core.models import Car
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
# from rest_framework.views import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


# models


@api_view(['GET', ])
def get_car(request, name):
    try:
        car = Car.objects.get(name=name)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = CarSerializer(car)
        return Response(serializer.data)


@api_view(['POST', ])
def create_car(request):
    car = Car()

    if request.method == "POST":
        serializer = CarSerializer(car, data=request)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATE)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


class api_test_calls(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            'test': 'success'
        }
        return Response(data)

    def post(self, request, *args, **kwargs):
        reqdata = request.data
        data = {
            'secondtest': 'success'
        }
        return Response(data)
# Create your views here.


def index(request):
    response = json.dumps({})
    return HttpResponse(response, content_type='text/json')


# def get_car(request, car_name):
#     if request.method == 'GET':
#         try:
#             car = Car.objects.get(name=car_name)
#             response = json.dumps(
#                 [{'Car': car.name, 'Top Speed': car.top_speed}])

#         except:
#             response = json.dumps(
#                 [{'Error': 'No car with such name'}])
#     return HttpResponse(response, content_type='text/json')


# @csrf_exempt
# def add_car(request):
#     if request.method == 'POST':
#         payload = json.loads(request.body)
#         car_name = payload['car_name']
#         top_speed = payload['top_speed']
#         car = Car(name=car_name, top_speed=top_speed)
#         try:
#             car.save()
#             response = json.dumps({'Success': 'Car added successfully'})
#         except:
#             response = json.dumps({'Error': 'Car add failed'})
#     return HttpResponse(response, content_type='text/json')
