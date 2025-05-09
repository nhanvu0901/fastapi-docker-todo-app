from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logging
import sys
import os

from .config import settings
from .database import engine, Base
from .routes import  todo_router
from .routes import  user_router
# Configure detailed logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Create tables
def create_tables():
    try:
        logger.info("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error creating database tables: {str(e)}")
        # Don't crash on startup, but log the error
        logger.error("Application will continue, but functionality may be limited")

# Initialize FastAPI application
app = FastAPI(
    title="Todo API",
    description="A FastAPI backend for a Todo List application",
    version="1.0.0",
)

# Configure CORS
allowed_origins = settings.ALLOWED_ORIGINS
logger.info(f"Configuring CORS with allowed origins: {allowed_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_router)
app.include_router(todo_router)


@app.get("/")
async def root():
    return {"message": "Welcome to the Todo API", "status": "running"}




@app.on_event("startup")
async def startup_event():
    logger.info("Starting Todo API application...")
    # Log environment for debugging
    logger.info(f"Environment: DATABASE_URL={os.environ.get('DATABASE_URL', 'from settings')}")
    logger.info(f"ALLOWED_ORIGINS={allowed_origins}")
    create_tables()
    logger.info("Application startup completed")


if __name__ == "__main__":
    logger.info("Starting uvicorn server...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)