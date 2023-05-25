from django.contrib import admin
from .models import User, Pack, Sound, Transaction, Genre, PackGenreAssociation, Tag, SoundTagAssociation

# admin.site.register(User)
admin.site.register(Pack)
admin.site.register(Sound)
admin.site.register(Transaction)
admin.site.register(Genre)
admin.site.register(PackGenreAssociation)
admin.site.register(Tag)
admin.site.register(SoundTagAssociation)
