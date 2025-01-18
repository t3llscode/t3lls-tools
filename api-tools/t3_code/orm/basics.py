import os
import sqlalchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

from t3_code.utility.general_purpose import read_docker_secret

# Database connection details
DB_USER = "manualuser"                              # Username
DB_PASSWORD = read_docker_secret('db_password')     # Read password from Docker secret
DB_HOST = "tools-db-tools-1"                        # This is your container name
DB_PORT = "5432"                                    # Postgres default port
DB_NAME = "tools"                                   # Name of the Database

# Note the async postgresql driver (postgresql+asyncpg://)
DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_async_engine(DATABASE_URL)

# Load the database schema
metadata = MetaData()

# Create async session maker
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

Base = declarative_base()

# Helper function to get async DB session
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

# Async function to check database connection
async def check_database_connection():
    try:
        async with engine.connect() as connection:
            await connection.execute(sqlalchemy.text("SELECT 1"))
            print("Connection to the database was successful.")
    except Exception as e:
        print(f"Connection to the database failed. Error: {e}")

# Async function to load metadata
async def load_metadata():
    async with engine.connect() as connection:
        await connection.run_sync(metadata.reflect)
        print(f"Available Tables: {list(metadata.tables.keys())}")