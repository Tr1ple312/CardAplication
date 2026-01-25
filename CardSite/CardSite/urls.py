from django.contrib import admin
from django.urls import path

from Card.views import CardAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/cards/', CardAPIView.as_view()),
    ]