# This file must be directly inside the `backend` folder.

# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the dependency file and install dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# --- THIS IS THE KEY CHANGE ---
# Copy the contents of the local 'app' subfolder into the container's working directory (/app)
COPY ./app .

# The command to run the application (will be overridden by docker-compose for development)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

