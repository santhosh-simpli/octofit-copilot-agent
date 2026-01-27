from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import LeaderboardEntry
from .serializers import LeaderboardEntrySerializer
from users.models import UserProfile

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardEntry.objects.all()
    serializer_class = LeaderboardEntrySerializer
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get current leaderboard based on user profiles"""
        profiles = UserProfile.objects.order_by('-points')[:20]
        leaderboard_data = []
        for idx, profile in enumerate(profiles, 1):
            leaderboard_data.append({
                'rank': idx,
                'user_id': profile.user.id,
                'username': profile.user.username,
                'points': profile.points,
                'fitness_level': profile.fitness_level
            })
        return Response(leaderboard_data)
