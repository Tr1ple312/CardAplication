from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from Card.views import CardViewSet, UserRegistrationView, DeckViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


router = routers.SimpleRouter()
router.register(r'cards', CardViewSet, basename='cards')
router.register(r'decks', DeckViewSet, basename='decks')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/register/', UserRegistrationView.as_view(), name='register'),  # ← Новое!
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify', TokenVerifyView.as_view(), name='token_verify'),
]
