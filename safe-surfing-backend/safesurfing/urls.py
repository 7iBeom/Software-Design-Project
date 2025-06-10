from django.urls import path
from .views import RegisterURLView, InspectURLView, URLListView, URLReinspectView, URLDeleteView, DeleteAllURLsView

urlpatterns = [
    path('register/', RegisterURLView.as_view(), name='register-url'),
    path('inspect/', InspectURLView.as_view(), name='inspect-url'),
    path('urls/', URLListView.as_view(), name='url-list'),
    path('urls/<int:pk>/reinspect/', URLReinspectView.as_view(), name='url-reinspect'),
    path('urls/<int:pk>/', URLDeleteView.as_view(), name='url-delete'),
    path('urls/all/', DeleteAllURLsView.as_view(), name='delete-all-urls'),
]
