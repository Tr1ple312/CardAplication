from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from Card.views import CardViewSet


router = routers.SimpleRouter()
router.register(r'cards', CardViewSet, basename='cards')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls))
]
