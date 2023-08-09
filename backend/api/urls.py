from django.urls import path
from . import views

urlpatterns = [
    path('packs/', views.get_packs),
    path('packs/trending/', views.get_trending_packs),
    path('packs/<int:pack_id>/', views.get_pack_id),
    path('packs/<int:pack_id>/sounds', views.get_pack_sounds),
    path('create-user/', views.create_user),
    path('login/', views.login_user),
    path('profile/', views.profile),
    #path('upload/', views.upload),
    path('genre/<int:genre_id>/', views.get_genre),
    path('genre/<int:genre_id>/sounds/', views.get_sounds_by_genre),
    path('genre/<int:genre_id>/packs/', views.get_packs_by_genre),
    path('sounds/<int:sound_id>/tags/',
         views.get_sound_tags, name='sound_tags'),
    path('create-payment-intent/', views.create_payment_intent,
         name='create-payment-intent'),
    path('download-files/', views.download_files, name='download-files'),
    path('download-packs/', views.download_packs, name='download-packs'),
    path('get-zip-file/<str:filename>',
         views.get_zip_file, name='get-zip-file'),
    path('generate-audio/', views.generate_audio),
]
