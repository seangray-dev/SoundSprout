from rest_framework import serializers
from django.contrib.auth.models import User
from sound_sprout.models import Pack, Sound, Genre


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'id')


class PackSerializer(serializers.ModelSerializer):
    uploader = UserSerializer(read_only=True)

    class Meta:
        model = Pack
        fields = ['id', 'name', 'description', 'price',
                  'cover_art_location', 'uploader', 'preview']


class SoundSerializer(serializers.ModelSerializer):
    pack = PackSerializer()

    class Meta:
        model = Sound
        fields = ['id', 'pack', 'name', 'audio_file', 'price']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']
