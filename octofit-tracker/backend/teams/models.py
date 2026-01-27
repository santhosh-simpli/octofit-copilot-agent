from django.db import models
from django.contrib.auth.models import User

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_teams')
    members = models.ManyToManyField(User, related_name='teams', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def get_total_points(self):
        """Calculate total points for all team members"""
        total = 0
        for member in self.members.all():
            if hasattr(member, 'profile'):
                total += member.profile.points
        return total
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-created_at']
