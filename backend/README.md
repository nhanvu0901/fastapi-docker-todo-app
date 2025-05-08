# Todo List Application with FastAPI and React

A complete Todo List application with authentication, featuring a FastAPI backend, PostgreSQL database, and React frontend.

## Project Structure

```
todo-app/
├── backend/                # FastAPI Python backend
│   ├── app/                # Application package
│   │   ├── models/         # Database models (SQLAlchemy)
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   ├── main.py         # Main application entry point
│   │   ├── database.py     # Database connection
│   │   └── config.py       # Configuration
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Backend Docker configuration
│   └── .env                # Environment variables
├── frontend/               # React frontend (not included in this setup)
└── docker-compose.yml      # Docker compose configuration
```

## Features

### Backend Features
- FastAPI with async/await support
- JWT Authentication
- PostgreSQL database with SQLAlchemy ORM
- Password hashing with bcrypt
- User registration and login
- Todo CRUD operations with user-specific data
- Docker containerization
- CORS support

### API Endpoints

**User Endpoints:**
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get JWT token
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile

**Todo Endpoints:**
- `GET /api/todos` - Get all todos for the current user
- `GET /api/todos/{todo_id}` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{todo_id}` - Update a todo
- `DELETE /api/todos/{todo_id}` - Delete a todo

## Prerequisites

- Docker
- Docker Compose

## Setup and Running

1. Clone this repository or create the file structure as shown above.

2. Start the application with Docker Compose:

```bash
docker-compose up
```

This will:
- Build and start the FastAPI backend
- Start the PostgreSQL database
- Create necessary database tables

3. Access the application:
   - Backend API: http://localhost:8000
   - API documentation: http://localhost:8000/docs
   - PostgreSQL: localhost:5432

## Backend API Usage

### User Registration

```bash
curl -X 'POST' \
  'http://localhost:8000/api/users/register' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}'
```

### User Login

```bash
curl -X 'POST' \
  'http://localhost:8000/api/users/login' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=test@example.com&password=password123'
```

### Creating a Todo (with JWT token)

```bash
curl -X 'POST' \
  'http://localhost:8000/api/todos/' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "My first todo",
  "description": "This is a test todo item",
  "completed": false
}'
```

## Connecting with React Frontend

The React frontend can connect to the FastAPI backend through the API endpoints listed above. Make sure to set up the frontend to:

1. Store the JWT token after login
2. Include the token in the Authorization header for protected requests
3. Handle authentication state (logged in vs. logged out)
4. Create UI components for login, registration, and todo management

## Development Notes

### Modifying the Backend

The backend code is mounted as a volume in Docker, so any changes to the Python code will automatically reload thanks to Uvicorn's reload option.

### Database Migrations

For production, you would want to:
1. Use Alembic for database migrations
2. Set up a more secure authentication flow
3. Implement proper error handling and logging

## Stopping the Application

```bash
docker-compose down
```

To remove volumes (this will delete all database data):

```bash
docker-compose down -v
```