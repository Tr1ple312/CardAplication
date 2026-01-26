from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, viewsets
from .models import Card
from .serializers import CardSerializer


class CardViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CardSerializer

    def get_queryset(self):
             return Card.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

