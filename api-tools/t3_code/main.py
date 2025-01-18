from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from sqlalchemy.ext.asyncio import AsyncSession
from t3_code.orm.basics import metadata, engine, get_db, check_database_connection, load_metadata

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup code
    await check_database_connection()
    await load_metadata()
    yield
    # Shutdown code (if any)

app = FastAPI(
    title="t3lls tools API",
    description="endpoints for t3lls tools",
    version="1.0.0",
    lifespan=lifespan
)

# Include routers
from t3_code.router.tooth_timer import router as fca_router

@app.get("/")
async def root():
    return {
        "message": "t3lls tools API - online",
    }