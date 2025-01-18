import os
import time
import logging
from urllib.parse import quote

def read_docker_secret(secret_name):
    """
    Reads a Docker secret from the specified path and returns its value.
    If the secret is not found, it falls back to reading an environment variable.
    """
    try:
        with open(f'/run/secrets/{secret_name}', 'r') as secret_file:
            return quote(secret_file.read().strip())
    except IOError:
        # Fallback for development environments when not using Docker secrets
        return quote(os.environ.get(f'SECRET_{secret_name.upper()}', ''))