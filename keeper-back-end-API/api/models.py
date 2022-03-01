from django.db import models

# Create your models here.


class Notes(models.Model):

    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=200)
    note = models.TextField()

    def _str_(self):
        return self.title


class TrashNotes(models.Model):

    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=200)
    note = models.TextField()

    def _str_(self):
        return self.note
