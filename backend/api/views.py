from rest_framework.response import Response
from rest_framework.decorators import api_view
from sound_sprout.models import Pack
from .serializers import PackSerializer
from django.http import HttpResponse
from sound_sprout.models import Sound
from .serializers import SoundSerializer


@api_view(['GET'])
def get_packs(request):
    packs = Pack.objects.all()
    serializer = PackSerializer(packs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_trending_packs(request):
    pack_ids = [2, 10, 9]
    packs = Pack.objects.filter(id__in=pack_ids)
    serializer = PackSerializer(packs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_pack_id(request, pack_id):
    try:
        pack = Pack.objects.get(id=pack_id)
        serializer = PackSerializer(pack)
        return Response(serializer.data)
    except Pack.DoesNotExist:
        return Response(status=404)


@api_view(['GET'])
def get_pack_sounds(request, pack_id):
    try:
        pack = Pack.objects.get(id=pack_id)
    except Pack.DoesNotExist:
        return Response(status=404)

    sounds = Sound.objects.filter(pack=pack)
    serializer = SoundSerializer(sounds, many=True)
    return Response(serializer.data)
