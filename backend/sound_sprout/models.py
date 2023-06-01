"""
This module contains the definitions for the models in the SoundSprout app.

Classes:
    - User: Represents a user of the application -> using built-in user model
    - Pack: Represents a collection of Sounds, uploaded by a User.
    - Sound: Represents an individual sound file that belongs to a Pack.
    - Transaction: Records the purchase of a Pack or Sound by a User.
    - Genre: Represents a category that can be associated with a Pack.
    - GenreAssociation: Represents a link between a Pack and a Genre.
    - Tag: Represents a label that can be associated with a Sound.
    - SoundTagAssociation: Represents a link between a Sound and a Tag.
"""

from django.db import models
from django.contrib.auth.models import User


class Pack(models.Model):
    """A Pack represents a collection of Sounds, uploaded by a User."""
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    cover_art_location = models.CharField(max_length=255)
    uploader = models.ForeignKey(User, on_delete=models.CASCADE)
    preview = models.CharField(max_length=255, blank=True, null=True)


class Sound(models.Model):
    """A Sound is an individual sound file that belongs to a Pack."""
    name = models.CharField(max_length=255)
    audio_file = models.FileField(upload_to='sounds/')
    price = models.DecimalField(max_digits=6, decimal_places=2)
    pack = models.ForeignKey(Pack, on_delete=models.CASCADE)


class Transaction(models.Model):
    """A Transaction records the purchase of a Pack or Sound by a User."""
    buyer = models.ForeignKey(User, on_delete=models.CASCADE)
    pack = models.ForeignKey(Pack, on_delete=models.CASCADE, null=True)
    sound = models.ForeignKey(Sound, on_delete=models.CASCADE, null=True)
    date = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=6, decimal_places=2)


class Genre(models.Model):
    """A Genre is a category that can be associated with a Pack."""
    name = models.CharField(max_length=255)


class PackGenreAssociation(models.Model):
    """A GenreAssociation is a link between a Pack and a Genre."""
    pack = models.ForeignKey(Pack, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)


class Tag(models.Model):
    """A Tag is a label that can be associated with a Sound."""
    name = models.CharField(max_length=255)


class SoundTagAssociation(models.Model):
    """A SoundTagAssociation is a link between a Sound and a Tag."""
    sound = models.ForeignKey(Sound, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
