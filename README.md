# Todo List Application with Docker

A simple Todo List application with Node.js backend, PostgreSQL database, and React frontend, all containerized with Docker.

## Project Structure

```
todo-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── models/
│   │   └── todoModel.js
│   ├── routes/
│   │   └── todos.js
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── wait-for-postgres.sh
├── frontend/ (Not included in this setup as requested)
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Docker
- Docker Compose

## Setup and Run

1. Clone the repository or set up the project structure as shown above.

2. Start the application:

```bash
docker-compose up
```

This will:
- Build the backend Docker image
- Start the PostgreSQL container
- Start the backend container (which will wait for PostgreSQL to be ready)
- Create the necessary database tables

3. The application will be available at:
    - Backend API: http://localhost:5000
    - PostgreSQL: localhost:5432

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Stopping the Application

```bash
docker-compose down
```

To remove volumes (this will delete the database data):

```bash
docker-compose down -v
```

## Development

### Backend
The backend code is mounted as a volume, so changes to the code will be reflected immediately thanks to nodemon.

### Frontend
When implementing the frontend, you would create a similar Docker setup with a React application that communicates with the backend.

## Connecting a React Frontend

For the React frontend, you would use the `todoApi.js` file that calls the backend API endpoints. The frontend would communicate with the backend using the URL specified by `REACT_APP_API_URL` environment variable, or default to `http://localhost:5000/api` in development.