from rest_framework import serializers
from django.contrib.auth.models import User
from sound_sprout.models import Pack


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name']


class PackSerializer(serializers.ModelSerializer):
    uploader = UserSerializer(read_only=True)

    class Meta:
        model = Pack
        fields = ['id', 'cover_art_location', 'uploader', 'name']
