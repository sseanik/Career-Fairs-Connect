from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.views import Response
# models and serializers
from .models import *
from .serializers import *
class Company(APIView):
    def get(self, request, *args, **kwargs):
        serializer_class = CompanySerializer
        companyField = self.kwargs['companyId']
        try:
            companyData = Companies.objects.get(company_id=companyField)
        except:
            return Response(status=404)
        serializer = CompanySerializer(companyData)
        # json = JSONRenderer().render(serializer.data)
        return Response(serializer.data, status=200)

class RegisterCompany(APIView):
    def post(self, request, *args, **kwargs):
        # if self.kwargs['acctype'] == 'company':
        # serializer_class = CompanySerializer
        # reqdata = request.data
        # data = {
        #     'secondtest' : 'success'
        # }
        return Response(status=500)
# Create your views here.
