from rest_framework import serializers
from .models import Card


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['word', 'translate', 'difficulty', 'is_learned', 'time_create', 'id']
        read_only_fields = ['id', 'time_create']  # Эти поля не должны изменяться через API
