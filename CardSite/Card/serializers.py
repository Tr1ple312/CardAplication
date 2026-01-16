from rest_framework import serializers

from Card.models import Card


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('english', 'russian')