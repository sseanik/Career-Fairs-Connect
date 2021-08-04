from rest_framework import serializers
from .models import *

# inspired from https://stackoverflow.com/questions/53319787/how-can-i-select-specific-fields-in-django-rest-framework
class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)

class UserSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = '__all__' 

class StudentSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Students
        fields = '__all__' 

class CompanySerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Companies
        fields = '__all__' 

class UniversitySerializer(DynamicFieldsModelSerializer):
    class Meta  :
        model = Universities
        fields = '__all__' 

class OpportunitySerializer(DynamicFieldsModelSerializer):
    class Meta  :
        model = Opportunities
        fields = '__all__'

class StallsSerializer(DynamicFieldsModelSerializer):
    class Meta  :
        model = Stalls
        fields = '__all__'

class PresentationSerializer(DynamicFieldsModelSerializer):
    class Meta  :
        model = Presentations
        fields = '__all__'


class CareerFairSerializer(DynamicFieldsModelSerializer):
    class Meta :
        model = CareerFairs
        fields = '__all__'

# breaks code
# class CompanySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Companies
#         fields = '__all__'
