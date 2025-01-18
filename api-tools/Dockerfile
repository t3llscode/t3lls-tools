# Use the official Python image as a base
FROM python:3.13-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# No port exposed, as we use the docker network, internal port is 8000

# Command to run the FastAPI application using Uvicorn
CMD ["uvicorn", "t3_code.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--timeout-graceful-shutdown", "0"]