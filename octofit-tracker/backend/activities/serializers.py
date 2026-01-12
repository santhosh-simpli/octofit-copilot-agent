from rest_framework import serializers
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Activity
        fields = ['id', 'user', 'username', 'activity_type', 'duration', 'distance', 
                  'calories', 'notes', 'points_earned', 'date', 'created_at']
        read_only_fields = ['id', 'points_earned', 'created_at']
