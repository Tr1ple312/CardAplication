from rest_framework import serializers
from .models import Card, Deck
from django.contrib.auth.models import User
from rest_framework import serializers


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['word', 'translate', 'difficulty', 'is_learned', 'time_create', 'id']
        read_only_fields = ['id', 'time_create']


class DeckSerializer(serializers.ModelSerializer):
    cards_count = serializers.SerializerMethodField()  # ← объяви поле ТУТ

    def get_cards_count(self,  obj):
        return obj.cards.count()

    class Meta:
        model = Deck
        fields = ['name', 'description', 'time_create', 'cards_count', 'id']
        read_only_fields = ['id', 'time_create', 'cards_count']


class DeckDetailSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only=True)
    class Meta:
        model = Deck
        fields = ['name', 'description', 'time_create', 'cards', 'id']
        read_only_fields = ['id', 'time_create']
