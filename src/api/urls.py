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

from core.register_student import register_student
from core.register_company import register_company
from core.register_university import register_university
from core.models import *
from core.views import *


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

    path('register/student/', register_student),
    path('register/university/', register_university),
    path('register/company/', register_company),

    re_path('^company/(?P<companyId>.+)/$', Company.as_view()),

]

