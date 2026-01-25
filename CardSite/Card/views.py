from django.core.serializers import serialize
from rest_framework.exceptions import NotFound
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


class CardAPIDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Card.objects.get(pk=pk, user=self.request.user)
        except Card.DoesNotExist:
            raise NotFound('Card not found')

    def get(self, request, pk):
        card = self.get_object(pk)
        serializer = CardSerializer(card)
        return Response(serializer.data)

    def patch(self, request, pk):
        card = self.get_object(pk)
        serializer = CardSerializer(card, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        card = self.get_object(pk)
        card.delete()
        return Response(status=204)