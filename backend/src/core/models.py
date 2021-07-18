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


class Universities(models.Model):
    university_id = models.AutoField(primary_key = True)
    university_name = models.CharField(max_length=50)
    # Potential cause of issues on deleting
    user_id = models.ForeignKey(User, on_delete=models.RESTRICT)


class Events(models.Model):
    event_id = models.AutoField(primary_key = True)
    # Discuss Max Text and Char???
    university_id = models.ForeignKey(Universities, on_delete=models.CASCADE)
    title = models.CharField(max_length = 50)
    company_description = models.TextField()
    # default auto_now=False, auto_now_add=False
    event_start_time = models.TimeField()
    event_end_time = models.TimeField()


class Registrations(models.Model):
    event_id = models.ForeignKey(Events, unique = False, on_delete = models.RESTRICT)
    company_id = models.ForeignKey(Companies, unique = False, on_delete = models.CASCADE)
    approval_status = models.CharField(max_length = 8)
    class Meta:
        unique_together = (("event_id", "company_id"),)


class Stalls(models.Model):
    stall_id = models.AutoField(primary_key = True) 
    company_id = models.ForeignKey(Companies, on_delete=models.CASCADE)
    event_id = models.ForeignKey(Events, on_delete=models.CASCADE)


class Presentations(models.Model):
    presentation_id = models.AutoField(primary_key = True)
    presentation_link = models.CharField(max_length=255)


class Students(models.Model):
    student_id = models.AutoField(primary_key = True)
    university = models.CharField(max_length = 50)
    degree = models.CharField(max_length = 100)
    wam = models.DecimalField(max_digits=5, decimal_places=2)
    user_id = models.ForeignKey(User, unique = True, on_delete=models.RESTRICT)


class Opportunities(models.Model):
    job_id = models.AutoField(primary_key=True)
    job_description = models.TextField()
    application_link = models.CharField(max_length = 100)
    stall_id = models.ForeignKey(Stalls, unique=True, on_delete=models.RESTRICT)


class QAMessages(models.Model):
    post_id = models.AutoField(primary_key=True)
    time = models.DateTimeField(auto_now_add=True, blank=True)
    parent_post_id = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)  # https://stackoverflow.com/questions/50878551/how-to-create-hierarchy-of-models
    content = models.TextField()


class Upvotes(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.RESTRICT)
    post_id = models.ForeignKey(QAMessages, on_delete=models.RESTRICT)
    class Meta:
        unique_together = ('user_id', 'post_id')

