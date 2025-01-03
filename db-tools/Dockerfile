FROM postgres:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-contrib && \
    rm -rf /var/lib/apt/lists/*
    
CMD ["postgres", "-c", "shared_preload_libraries=uuid-ossp"]