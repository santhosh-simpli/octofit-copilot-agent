# OctoFit Tracker - Fitness Tracking Application

A comprehensive fitness tracking application built for Mergington High School to help students stay active and motivated through friendly competition and team challenges.

## Features

- **User Profiles**: Track individual fitness levels and points
- **Activity Logging**: Log various types of workouts including running, walking, cycling, swimming, strength training, and yoga
- **Team Management**: Create and join teams to compete together
- **Leaderboard**: View rankings and compete with other users
- **Points System**: Earn points based on activity duration (1 point per minute)

## Technology Stack

### Backend
- **Framework**: Django 4.2.26
- **API**: Django REST Framework 3.14.0
- **Database**: SQLite (development)
- **Authentication**: Django AllAuth
- **CORS**: Django CORS Headers

### Frontend
- **Framework**: React.js
- **Styling**: Bootstrap 5
- **Routing**: React Router DOM
- **UI Components**: Custom React components

## Project Structure

```
octofit-tracker/
├── backend/
│   ├── octofit_tracker/       # Django project settings
│   ├── users/                 # User profiles app
│   ├── activities/            # Activity tracking app
│   ├── teams/                 # Team management app
│   ├── leaderboard/           # Leaderboard app
│   ├── manage.py
│   ├── requirements.txt
│   └── db.sqlite3
└── frontend/
    ├── src/
    │   ├── components/        # React components
    │   │   ├── Dashboard.js
    │   │   ├── Activities.js
    │   │   ├── Teams.js
    │   │   └── Leaderboard.js
    │   ├── App.js
    │   └── index.js
    ├── public/
    └── package.json
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd octofit-tracker/backend
```

2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

6. Create sample data (optional):
```bash
python manage.py shell < create_sample_data.py
```

7. Start the Django development server:
```bash
python manage.py runserver 0.0.0.0:8000
```

The backend API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd octofit-tracker/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Users & Profiles
- `GET /api/users/` - List all users
- `GET /api/profiles/` - List all user profiles
- `GET /api/profiles/top_users/` - Get top 10 users by points

### Activities
- `GET /api/activities/` - List all activities
- `POST /api/activities/` - Create a new activity
- `GET /api/activities/my_activities/?user_id=<id>` - Get activities for a user

### Teams
- `GET /api/teams/` - List all teams
- `POST /api/teams/` - Create a new team
- `POST /api/teams/<id>/join/` - Join a team
- `POST /api/teams/<id>/leave/` - Leave a team

### Leaderboard
- `GET /api/leaderboard/current/` - Get current leaderboard

## Development

### Running Tests
```bash
# Backend tests
cd octofit-tracker/backend
python manage.py test

# Frontend tests
cd octofit-tracker/frontend
npm test
```

### Code Style
- Backend: Follow PEP 8 style guide
- Frontend: Follow Airbnb JavaScript Style Guide

## Deployment

### Backend (Django)
1. Update `ALLOWED_HOSTS` in settings.py
2. Set `DEBUG = False` for production
3. Configure a production database (PostgreSQL recommended)
4. Collect static files: `python manage.py collectstatic`
5. Use a production WSGI server like Gunicorn

### Frontend (React)
1. Build the production bundle:
```bash
npm run build
```
2. Serve the build directory using a web server (Nginx, Apache, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built for Mergington High School
- Inspired by the need to keep students active and engaged
- Special thanks to Paul Octo (PE Teacher) and Jessica Cat (IT Department Head)

## Support

For support, please contact the development team or open an issue in the repository.
