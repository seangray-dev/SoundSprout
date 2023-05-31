from django.urls import path
from . import views

urlpatterns = [
    path('packs/', views.get_packs),
    path('packs/trending/', views.get_trending_packs),
    path('packs/<int:pack_id>/', views.get_pack_id),
]
