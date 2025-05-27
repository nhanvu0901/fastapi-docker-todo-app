#!/bin/bash

# Exit on any error
set -e

echo "=== Todo App Backend Startup ==="
echo "Waiting for PostgreSQL to be ready..."

# Wait for PostgreSQL to be ready
until pg_isready -h postgres -p 5432 -U postgres; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "✅ PostgreSQL is ready!"

# Optional: Run database migrations if you have them
# echo "Running database migrations..."
# alembic upgrade head

echo "🚀 Starting FastAPI application..."

# Start the FastAPI application with uvicorn
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload