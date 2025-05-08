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

# Create a script to wait for PostgreSQL and then start the app
RUN echo '#!/bin/bash\n\
echo "Waiting for PostgreSQL..."\n\
while ! pg_isready -h postgres -p 5432 -U postgres; do\n\
  sleep 1\n\
done\n\
echo "PostgreSQL is ready!"\n\
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload\n\
' > /app/start.sh

RUN chmod +x /app/start.sh

# Command to run the application
CMD ["/app/start.sh"]