from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.forms.models import model_to_dict
from .models import Card


DIFFICULTY_MAP = {
    'very easy': 1,
    'easy': 2,
    'medium': 3,
    'hard': 4,
    'very hard': 5
}


class CardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        lst = Card.objects.all().values()
        return Response({'words': list(lst)})

    def post(self, request):
        english = request.data.get('english') or request.GET.get('english')
        russian = request.data.get('russian') or request.GET.get('russian')
        difficulty_str = request.data.get('difficulty') or request.GET.get('difficulty')

        difficulty = DIFFICULTY_MAP.get(difficulty_str, 1)

        post_new = Card.objects.create(
            english=english,
            russian=russian,
            difficulty=difficulty,
            user=request.user
        )

        return Response({'card': model_to_dict(post_new)})
