from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Team
from .serializers import TeamSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    
    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        """Join a team"""
        team = self.get_object()
        user_id = request.data.get('user_id')
        if user_id:
            from django.contrib.auth.models import User
            try:
                user = User.objects.get(id=user_id)
                team.members.add(user)
                return Response({'status': 'joined team'})
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=404)
        return Response({'error': 'user_id required'}, status=400)
    
    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        """Leave a team"""
        team = self.get_object()
        user_id = request.data.get('user_id')
        if user_id:
            from django.contrib.auth.models import User
            try:
                user = User.objects.get(id=user_id)
                team.members.remove(user)
                return Response({'status': 'left team'})
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=404)
        return Response({'error': 'user_id required'}, status=400)
