from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from sound_sprout.models import Pack
from sound_sprout.models import Sound
from django.contrib.auth.models import User
from .serializers import PackSerializer
from .serializers import SoundSerializer
from django.db import IntegrityError


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


@api_view(['POST', 'OPTIONS'])
@permission_classes([AllowAny])
def create_user(request):
    username = request.data.get('username')
    first_name = request.data.get('firstName')
    last_name = request.data.get('lastName')
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        user.save()
        return Response({'success': True})
    except IntegrityError:
        return Response({'success': False, 'error': 'Username already exists'}, status=400)
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, status=500)
