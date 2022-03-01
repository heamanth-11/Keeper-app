from django.contrib import admin
from .models import Notes,TrashNotes
# Register your models here.
admin.site.register(Notes)
admin.site.register(TrashNotes)