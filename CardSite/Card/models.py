from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Card(models.Model):

    DIFFICULTY_LEVELS = [
        (1, 'very easy'),
        (2, 'easy'),
        (3, 'medium'),
        (4, 'hard'),
        (5, 'very hard'),
    ]

    english = models.CharField(max_length=100)
    russian = models.CharField(max_length=100)
    time_create = models.DateTimeField(auto_now_add=True)
    difficulty = models.IntegerField(default=1, choices=DIFFICULTY_LEVELS)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.english
