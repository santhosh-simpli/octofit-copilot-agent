from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Activity
from .serializers import ActivitySerializer
from users.models import UserProfile

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    
    def perform_create(self, serializer):
        activity = serializer.save()
        # Update user profile points
        user_profile, created = UserProfile.objects.get_or_create(user=activity.user)
        user_profile.points += activity.points_earned
        user_profile.save()
    
    @action(detail=False, methods=['get'])
    def my_activities(self, request):
        """Get activities for the current user"""
        user_id = request.query_params.get('user_id')
        if user_id:
            activities = Activity.objects.filter(user_id=user_id)
            serializer = self.get_serializer(activities, many=True)
            return Response(serializer.data)
        return Response({'error': 'user_id parameter required'}, status=400)
