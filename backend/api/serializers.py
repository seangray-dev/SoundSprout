from rest_framework import serializers
from django.contrib.auth.models import User
from sound_sprout.models import Pack
from sound_sprout.models import Sound


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class PackSerializer(serializers.ModelSerializer):
    uploader = UserSerializer(read_only=True)

    class Meta:
        model = Pack
        fields = ['id', 'name', 'description', 'price',
                  'cover_art_location', 'uploader', 'preview']


class SoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sound
        fields = ['pack', 'name', 'audio_file', 'price']
