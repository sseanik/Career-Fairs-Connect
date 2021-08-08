"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import re_path

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.authtoken.views import obtain_auth_token

from .CareerFairListForUni import *
from .CareerFairListGlobal import *
# from .CompanyStallData import *
from .StallList import StallList
from .register_student import *
from .register_company import *
from .register_university import *
from .Presentations import *
from .Company import *
from .Student import *
from .University import *
from .OpportunityList import *
from .Opportunity import *
from .get_career_fair_data import *
from .get_stall_data import *
from .Approvals import *
from .GetUserData import *
from .Logout import *
from .StallMessages import *
from .Upvote import *


schema_view = get_schema_view(
    openapi.Info(
        title="Online Careers Fair API",
        default_version='v1',
        description="Fun for students employers and universities",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="arthur.fung@ad.unsw.edu.au"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)




urlpatterns = [
    path('admin/', admin.site.urls),
    # ???
    # path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    path('user/login/', obtain_auth_token),
    path('user/logout/', Logout.as_view()),
    path('user/register/student/', register_student),
    path('user/register/university/', register_university),
    path('user/register/company/', register_company),
    path('user/data/', userData.as_view()),


    path('careerfairs/<int:eventId>/stalls/', StallList.as_view()),
    path('careerfairs/delete/<int:eventId>/', CareerFairListGlobal.as_view()),
    re_path('^careerfairs/(?P<eventId>.+)/$', get_career_fair_data),
    path('careerfairs/', CareerFairListGlobal.as_view()),
    path('careerfairs/applications/', Approvals.as_view()),
    path('careerfairs/stalls/<int:stallId>/', get_stall_data),
    
    path('presentation/create/', create_presentation),
    path('presentation/edit/', edit_presentation),
    path('presentation/delete/<int:presentationId>/', delete_presentation),
    re_path('^presentation/get/stall/(?P<stallId>.+)/$', get_presentation),
    re_path('^presentation/get/(?P<eventId>.+)/$', get_all_presentations),

    path('company/<int:stallId>/opportunities/', OpportunityList.as_view()),
    path('company/<int:companyId>/opportunities/<int:job_id>', Opportunity.as_view()),
    re_path('^company/(?P<companyId>.+)/$', Company.as_view()),
    
    re_path('^student/(?P<studentId>.+)/$', Student.as_view()),
    
    path('university/<int:universityId>/careerfairs/', CareerFairListForUni.as_view()),
    re_path('^university/(?P<universityId>.+)/$', University.as_view()),
    path('questions/<int:stallId>/', StallMessages.as_view()),
    path('questions/<int:stallId>/<int:postId>/upvotes/', Upvote.as_view()),
]

