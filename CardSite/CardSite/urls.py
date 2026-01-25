from django.contrib import admin
from django.urls import path

from Card.views import CardAPIView, CardAPIDetail


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/cards/', CardAPIView.as_view()),
    path('api/v1/cards/<int:pk>/', CardAPIDetail.as_view())
    ]