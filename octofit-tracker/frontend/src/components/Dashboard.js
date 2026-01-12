import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalActivities: 0,
    totalPoints: 0,
    myRank: '-',
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // For demo purposes, we'll use dummy data
      // In a real app, you'd fetch from the API with authentication
      setStats({
        totalActivities: 5,
        totalPoints: 250,
        myRank: 3,
      });
      setRecentActivities([
        { id: 1, activity_type: 'running', duration: 30, date: '2024-01-10', points_earned: 30 },
        { id: 2, activity_type: 'cycling', duration: 45, date: '2024-01-09', points_earned: 45 },
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Activities</h5>
              <p className="display-4">{stats.totalActivities}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Points</h5>
              <p className="display-4">{stats.totalPoints}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">My Rank</h5>
              <p className="display-4">#{stats.myRank}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Recent Activities</h5>
        </div>
        <div className="card-body">
          {recentActivities.length === 0 ? (
            <p className="text-muted">No activities yet. Start logging your workouts!</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Duration (min)</th>
                    <th>Date</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map(activity => (
                    <tr key={activity.id}>
                      <td className="text-capitalize">{activity.activity_type}</td>
                      <td>{activity.duration}</td>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                      <td><span className="badge bg-success">{activity.points_earned}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
