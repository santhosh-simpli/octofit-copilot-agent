from rest_framework import serializers
from .models import Team
from users.serializers import UserSerializer

class TeamSerializer(serializers.ModelSerializer):
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    members_details = UserSerializer(source='members', many=True, read_only=True)
    member_count = serializers.SerializerMethodField()
    total_points = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'created_by', 'created_by_username', 
                  'members', 'members_details', 'member_count', 'total_points', 
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_member_count(self, obj):
        return obj.members.count()
    
    def get_total_points(self, obj):
        return obj.get_total_points()
