from django.urls import path
from . import views

app_name = 'Menu'

urlpatterns = [
    path('',views.Menu,name = 'Menu'),
    path('LogicaDifusa/',views.LogicaDif,name = 'Logica'),
    path('TallerdeGraficacion/',views.Home,name = 'Grafica'),
    
]