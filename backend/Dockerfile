FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Expose the port
EXPOSE 8000

# Run directly with uvicorn instead of using a script
CMD ["bash", "-c", "echo 'Waiting for PostgreSQL...' && until pg_isready -h postgres -p 5432 -U postgres; do sleep 1; done && echo 'PostgreSQL is ready!' && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"]