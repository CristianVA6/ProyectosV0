from django.urls import path
from . import views

app_name = 'Logica'

urlpatterns = [
    path('LogicaD1/',views.g,name = 'p1'),
]