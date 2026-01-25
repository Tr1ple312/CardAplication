from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Card
from .serializers import CardSerializer


class CardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cards = Card.objects.filter(user=request.user)
        serializer = CardSerializer(cards, many=True)
        return Response({'words': serializer.data})

    def post(self, request):
        serializer = CardSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({'card': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)