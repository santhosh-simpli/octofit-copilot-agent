import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard/current/`);
      const data = await response.json();
      setLeaderboard(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoading(false);
    }
  };

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'bg-warning text-dark';
    if (rank === 2) return 'bg-secondary';
    if (rank === 3) return 'bg-danger';
    return 'bg-primary';
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
      <h1 className="mb-4">Leaderboard</h1>

      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Top Performers</h5>
        </div>
        <div className="card-body p-0">
          {leaderboard.length === 0 ? (
            <p className="text-muted p-4">No leaderboard data yet. Start logging activities to compete!</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{width: '80px'}}>Rank</th>
                    <th>User</th>
                    <th>Fitness Level</th>
                    <th className="text-end">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry) => (
                    <tr key={entry.user_id} className={entry.rank <= 3 ? 'table-active' : ''}>
                      <td>
                        <span className={`badge ${getRankBadgeColor(entry.rank)} fs-6`}>
                          #{entry.rank}
                        </span>
                      </td>
                      <td>
                        <strong>{entry.username}</strong>
                      </td>
                      <td>
                        <span className="text-capitalize text-muted">
                          {entry.fitness_level || 'beginner'}
                        </span>
                      </td>
                      <td className="text-end">
                        <span className="badge bg-success fs-6">
                          {entry.points} pts
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {leaderboard.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-4 mb-3">
            <div className="card text-center border-warning">
              <div className="card-body">
                <h2 className="text-warning">🥇</h2>
                <h5>{leaderboard[0]?.username}</h5>
                <p className="mb-0">{leaderboard[0]?.points} points</p>
              </div>
            </div>
          </div>
          {leaderboard[1] && (
            <div className="col-md-4 mb-3">
              <div className="card text-center border-secondary">
                <div className="card-body">
                  <h2 className="text-secondary">🥈</h2>
                  <h5>{leaderboard[1]?.username}</h5>
                  <p className="mb-0">{leaderboard[1]?.points} points</p>
                </div>
              </div>
            </div>
          )}
          {leaderboard[2] && (
            <div className="col-md-4 mb-3">
              <div className="card text-center border-danger">
                <div className="card-body">
                  <h2 className="text-danger">🥉</h2>
                  <h5>{leaderboard[2]?.username}</h5>
                  <p className="mb-0">{leaderboard[2]?.points} points</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
