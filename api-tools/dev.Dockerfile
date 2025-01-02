# Use the official Python image as the base
FROM python:3.10-slim

# Set working directory
WORKDIR /code

# Copy requirements and install dependencies
COPY requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the application code
COPY ./app /code/app

# No port exposed, as we use the docker network, internal port is 8080

# Command to run the application
CMD ["fastapi", "dev", "app/main.py", "--port", "8080", "--host", "0.0.0.0"]