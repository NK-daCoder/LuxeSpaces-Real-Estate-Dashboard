from django.urls import path
from .views import PropertyListApiView, PropertyCreateApiView, PropertyDetailApiView

urlpatterns = [
    path('properties/', PropertyListApiView.as_view(), name='property-list'),
    path('properties/create/', PropertyCreateApiView.as_view(), name='property-create'),
    path('properties/<int:pk>/', PropertyDetailApiView.as_view(), name='property-detail'),
]
