from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Card
from .serializers import CardSerializer


class CardAPIList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CardSerializer

    def get_queryset(self):
        return Card.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CardAPIDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CardSerializer

    def get_queryset(self):
        return Card.objects.filter(user=self.request.user)