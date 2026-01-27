from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, viewsets, status
from rest_framework.response import Response

from .models import Card
from .serializers import CardSerializer, UserRegistrationSerializer


class CardViewSet(viewsets.ModelViewSet):
    permission_classes = []
    serializer_class = CardSerializer

    def get_queryset(self):
             return Card.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserRegistrationView(generics.CreateAPIView):
    permission_classes = [AllowAny]  # Доступно без авторизации
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            'user': {
                'username': user.username,
                'email': user.email
            },
            'message': 'User created successfully'
        }, status=status.HTTP_201_CREATED)