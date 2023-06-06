from django.urls import path
from . import views

urlpatterns = [
    path('packs/', views.get_packs),
    path('packs/trending/', views.get_trending_packs),
    path('packs/<int:pack_id>/', views.get_pack_id),
    path('packs/<int:pack_id>/sounds', views.get_pack_sounds),
    path('create-user/', views.create_user),
    path('login/', views.login_user),
]
