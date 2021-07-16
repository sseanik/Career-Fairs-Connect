from django.db import models
from django.contrib.auth.models import User


# class AUTH_USER
# Extend using onetoonelink

class Companies(models.Model):
    company_id = models.AutoField(primary_key = True)
    company_name = models.CharField(max_length = 50)
    user_id = models.ForeignKey(User, unique = True, on_delete = models.RESTRICT)
    # Discuss Max Text and Char???
    company_description = models.TextField()
    company_webpage_url = models.CharField(max_length = 150)
    company_logo_url = models.CharField(max_length = 150)
    
class Registrations(models.Model):
    event_id = models.ForeignKey(Events, unique = False, on_delete = models.RESTRICT)
    company_id = models.ForeignKey(Company, unique = False, on_delete = models.CASCADE)
    approval_status = models.CharField(max_length = 8)
    
class Events(models.Model):
    event_id = models.AutoField(primary_key = True)
    # Discuss Max Text and Char???
    university_id = models.ForeignKey(Universities, on_delete=models.CASCADE)(max_length = 50)
    title = models.CharField(max_length = 50)
    company_description = models.TextField()
    # default auto_now=False, auto_now_add=False
    event_start_time = models.TimeField()
    event_end_time = models.TimeField()
class Universities(models.Model):
    university_id = models.AutoField(primary_key = True)
    university_name = models.CharField(max_length=50)
    # Potential cause of issues on deleting
    user_id = models.ForeignKey(User, on_delete=models.RESTRICT)
class stall(models.Model):
    stall_id = models.AutoField(primary_key = True) 
    company_id = models.ForeignKey(Companies, on_delete=models.CASCADE)
    event_id = models.ForeignKey(Events, on_delete=models.CASCADE)

