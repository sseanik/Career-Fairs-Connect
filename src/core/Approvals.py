from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import Stalls

class Approvals(APIView):
    def post(self, request, format=None):
        company_id = request.data['companyId']
        event_id = request.data['eventId']
        stall = Stalls.objects.filter(company_id=request.data['companyId'], event_id=request.data["eventId"])
        if not stall:
            return Response('Cannot find stall for company_id= '+ str(company_id) + ' and event_id= ' + str(event_id),
                            status=status.HTTP_400_BAD_REQUEST)
        stall = stall[0]
        if request.data["approval"] == True:
            stall.approval_status = "Approved"
            stall.save()
            return Response("Application approved")
        else:
            stall.approval_status = "Rejected"
            stall.save()
            return Response("Application denied")

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


