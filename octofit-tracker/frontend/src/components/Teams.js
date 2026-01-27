import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    created_by: 1, // Demo user ID
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/`);
      const data = await response.json();
      setTeams(data.results || data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/teams/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Team created successfully!');
        setShowForm(false);
        fetchTeams();
        setFormData({
          name: '',
          description: '',
          created_by: 1,
        });
      } else {
        alert('Error creating team');
      }
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Error creating team');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleJoinTeam = async (teamId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/${teamId}/join/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: 1 }),
      });
      
      if (response.ok) {
        alert('Joined team successfully!');
        fetchTeams();
      } else {
        alert('Error joining team');
      }
    } catch (error) {
      console.error('Error joining team:', error);
      alert('Error joining team');
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Teams</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create Team'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Create New Team</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Team Name</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Create Team</button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {teams.length === 0 ? (
          <div className="col-12">
            <p className="text-muted">No teams yet. Create the first team!</p>
          </div>
        ) : (
          teams.map(team => (
            <div key={team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description || 'No description'}</p>
                  <div className="mb-2">
                    <small className="text-muted">
                      Created by: {team.created_by_username || 'Unknown'}
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-info me-2">
                        {team.member_count || 0} members
                      </span>
                      <span className="badge bg-success">
                        {team.total_points || 0} pts
                      </span>
                    </div>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleJoinTeam(team.id)}
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Teams;
