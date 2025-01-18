FROM postgres:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-contrib && \
    rm -rf /var/lib/apt/lists/*

# TODO: Run a script here which checks if the database is already matching the schema, otherwise load the schema

CMD ["postgres", "-c", "shared_preload_libraries=uuid-ossp"]