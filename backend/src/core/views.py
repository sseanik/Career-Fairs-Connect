from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.views import Response
# models
from .models import api_test


class api_test_calls(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            'test' : 'success'
        }
        return Response(data)

    def post(self, request, *args, **kwargs):
        reqdata = request.data
        data = {
            'secondtest' : 'success'
        }
        return Response(data)
# Create your views here.
