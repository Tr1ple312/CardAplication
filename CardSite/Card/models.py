from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import CharField, ForeignKey, ManyToManyField

User = get_user_model()

class Deck(models.Model):

    name = CharField(max_length=100)
    description = models.TextField(blank=True)
    user = ForeignKey(User, on_delete=models.CASCADE, related_name='decks')
    time_create = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-time_create']

class Card(models.Model):

    DIFFICULTY_LEVELS = [
        (1, 'very easy'),
        (2, 'easy'),
        (3, 'medium'),
        (4, 'hard'),
        (5, 'very hard'),
    ]

    word = models.CharField(max_length=100, blank=False)
    translate = models.CharField(max_length=100, blank=False)
    time_create = models.DateTimeField(auto_now_add=True, db_index=True)
    difficulty = models.IntegerField(default=1, choices=DIFFICULTY_LEVELS, db_index=True)
    is_learned = models.BooleanField(default=False, db_index=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards')
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE, related_name='cards', blank=True, null=True)

    def __str__(self):
        return self.word

    class Meta:
        ordering = ['-time_create']



