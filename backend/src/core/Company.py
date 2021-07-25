from rest_framework.views import APIView
from rest_framework.views import Response
from .serializers import CompanySerializer
from rest_framework import status
from .models import *

class Company(APIView):
    serializer_class = CompanySerializer
    def get(self, request, *args, **kwargs):
        companyField = self.kwargs['companyId']
        try:
            companyData = Companies.objects.get(company_id=companyField)
        except:
            return Response(status=404)
        serializer = CompanySerializer(companyData)
        # json = JSONRenderer().render(serializer.data)
        return Response(serializer.data, status=200)

    def post(self, request, companyId, format=None):
        if not request.user.is_authenticated:
            return Response("Please pass Token in the Authorisation header", status=status.HTTP_401_UNAUTHORIZED)
        if request.user.user_type != User.COMPANY:
            return Response("Only Company users can access this endpoint", status=status.HTTP_403_FORBIDDEN)
        company = Companies.objects.get(company_id=companyId)
        if company.user_id_id != request.user.userID:  # TODO user_id_id -> we need to rename this in all models
            return Response("You can only update info for your company", status=status.HTTP_403_FORBIDDEN)

        request.data['user_id'] = request.user.userID # we don't ask for this field in the POST body, but it is required for the model we deserialise
        serializer = CompanySerializer(company, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


