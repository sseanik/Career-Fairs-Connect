
from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework import status
from .models import *
from serializers import OpportunitySerializer


class Opportunity(APIView):
    def get_object(self, id):
        #opportunityField = self.kwargs['job_id']
        try:
            return Opportunities.objects.get(job_id=id)
        except:
            return Response(status=404)

    def get(self, request, id, *args, **kwargs):
        opportunity = self.get_object(id)
        serializer = OpportunitySerializer(opportunity)
        # json = JSONRenderer().render(serializer.data)
        return Response(serializer.data, status=200)

    def post(self, request, id, format=None):
        opportunity = self.get_object(id)
        serializer = OpportunitySerializer(opportunity, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        opportunity = self.get_object(id)
        opportunity.delete()
        return Response(status=status.HTTP_404_NO_CONTENT)

