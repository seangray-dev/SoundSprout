from rest_framework import serializers
from django.contrib.auth.models import User
from sound_sprout.models import Pack, Sound, Genre, Tag, SoundTagAssociation


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
        fields = ['id', 'pack', 'name', 'audio_file', 'price', 'bpm', 'key']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class SoundTagAssociationSerializer(serializers.ModelSerializer):
    tag_name = serializers.SerializerMethodField()

    class Meta:
        model = SoundTagAssociation
        fields = '__all__'

    def get_tag_name(self, obj):
        return obj.tag.name
