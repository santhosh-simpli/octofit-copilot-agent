from django.db import models
from django.contrib.auth.models import User

class LeaderboardEntry(models.Model):
    """Model to track weekly/monthly leaderboard snapshots"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries')
    period = models.CharField(
        max_length=20,
        choices=[
            ('weekly', 'Weekly'),
            ('monthly', 'Monthly'),
            ('all_time', 'All Time'),
        ]
    )
    rank = models.IntegerField()
    points = models.IntegerField()
    period_start = models.DateField()
    period_end = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - Rank {self.rank} ({self.period})"
    
    class Meta:
        ordering = ['rank']
        verbose_name_plural = 'Leaderboard Entries'
