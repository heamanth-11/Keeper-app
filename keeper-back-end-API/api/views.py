from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . models import Notes,TrashNotes
from .serializers import NoteSerializer, TrashNoteSerializer
# Create your views here.


@api_view(['GET'])
def getApi(request):
    notes = Notes.objects.all()
    print(request)
    # print(notes,'hi')
    serializer = NoteSerializer(notes, many=True)
    # print(serializer.data,'ok=ok=ok')
    return Response(serializer.data)
    # return Response(['hi','hello'])


@api_view(['GET', 'POST'])
def home(request):
    return Response("welcome home")


@api_view(['POST'])
def addNote(request):
    print(request.data)
    id = request.data.get("id")
    title = request.data.get('title')
    note = request.data.get('body')
    print(id, title, note)
    Notes(id=id, title=title, note=note).save()
    print(title)
    return Response("data saved successfully")


@api_view(['PUT'])
def deleteNote(request):
    print(request.data)
    id = request.data.get('id')
    record = Notes.objects.get(id=id)
    TrashNotes(id=record.id, title=record.title, note=record.note).save()
    record.delete()
    return Response('Item moved to trash Successfully!.. ')


@api_view(['PUT'])
def restore(request):
    print(request.data)
    id = request.data.get('id')
    record = TrashNotes.objects.get(id=id)
    Notes(id=record.id, title=record.title, note=record.note).save()
    record.delete()
    return Response('Item restored Successfully!.. ')

@api_view(['GET'])
def trashNotes(request):
    notes = TrashNotes.objects.all()
    print(request)
    serializer = TrashNoteSerializer(notes, many=True)
    return Response(serializer.data)
  


@api_view(['PUT'])
def updateNote(request):
    print(request.data)
    if request.data != None:
        id = request.data.get('id')
        updatedNote = request.data.get('body')
        record = Notes.objects.get(id=id)
        record.note = updatedNote
        record.save()

    return Response('Item Updated Sucessfully...')
    
@api_view(['PUT'])
def deleteTrashNote(request):
    print(request.data)
    id = request.data.get('id')
    record = TrashNotes.objects.get(id=id)
    record.delete()
    return Response('Item Deleted Successfully!.. ')


