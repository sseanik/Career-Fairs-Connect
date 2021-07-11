from django.db import models

class fairEvent(models.Model):
    eventId = models.AutoField(primary_key = True)
    title = models.CharField(max_length = 50)
    description = models.TextField()
    eventStart = models.DateTimeField()
    eventEnd = models.DateTimeField()
    
class stall(models.Model):
    eventId = models.ForeignKey('fairEvent', on_delete=models.PROTECT)
    stallId = models.AutoField(primary_key = True) 