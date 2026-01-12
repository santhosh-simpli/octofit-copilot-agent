import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    activity_type: 'running',
    duration: '',
    distance: '',
    calories: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
    user: 1, // Demo user ID
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/`);
      const data = await response.json();
      setActivities(data.results || data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/activities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Activity logged successfully!');
        setShowForm(false);
        fetchActivities();
        setFormData({
          activity_type: 'running',
          duration: '',
          distance: '',
          calories: '',
          notes: '',
          date: new Date().toISOString().split('T')[0],
          user: 1,
        });
      } else {
        alert('Error logging activity');
      }
    } catch (error) {
      console.error('Error submitting activity:', error);
      alert('Error logging activity');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Activities</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Log Activity'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Log New Activity</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Activity Type</label>
                  <select 
                    className="form-select" 
                    name="activity_type"
                    value={formData.activity_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="running">Running</option>
                    <option value="walking">Walking</option>
                    <option value="cycling">Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="strength">Strength Training</option>
                    <option value="yoga">Yoga</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date</label>
                  <input 
                    type="date" 
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Duration (minutes)</label>
                  <input 
                    type="number" 
                    className="form-control"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Distance (km)</label>
                  <input 
                    type="number" 
                    className="form-control"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    step="0.1"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Calories</label>
                  <input 
                    type="number" 
                    className="form-control"
                    name="calories"
                    value={formData.calories}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea 
                  className="form-control"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Log Activity</button>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Activity History</h5>
        </div>
        <div className="card-body">
          {activities.length === 0 ? (
            <p className="text-muted">No activities logged yet. Start tracking your fitness journey!</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Activity</th>
                    <th>Duration</th>
                    <th>Distance</th>
                    <th>Calories</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map(activity => (
                    <tr key={activity.id}>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                      <td className="text-capitalize">{activity.activity_type}</td>
                      <td>{activity.duration} min</td>
                      <td>{activity.distance ? `${activity.distance} km` : '-'}</td>
                      <td>{activity.calories || '-'}</td>
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

export default Activities;
