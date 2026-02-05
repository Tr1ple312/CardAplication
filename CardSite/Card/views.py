from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, viewsets, status
from rest_framework.response import Response

from .models import Card, Deck
from .serializers import CardSerializer, UserRegistrationSerializer, DeckSerializer, DeckDetailSerializer


class CardViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CardSerializer

    def get_queryset(self):
        queryset = Card.objects.filter(user=self.request.user)

        deck_id = self.request.query_params.get('deck')
        if deck_id:
            queryset = queryset.filter(deck_id=deck_id)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DeckViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = DeckSerializer

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DeckDetailSerializer
        return DeckSerializer

    def get_queryset(self):
        return Deck.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserRegistrationView(generics.CreateAPIView):
    permission_classes = [AllowAny]
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