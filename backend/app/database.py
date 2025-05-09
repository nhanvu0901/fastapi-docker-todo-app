from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings
import time
import logging
import os

logger = logging.getLogger(__name__)

# Create SQLAlchemy engine
# Get Database URL from environment variable or settings
SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL", settings.DATABASE_URL)
logger.info(f"Using database URL: {SQLALCHEMY_DATABASE_URL}")

# Maximum number of retries for database connection
MAX_RETRIES = 10
RETRY_DELAY = 5  # seconds


def get_engine():
    """Create engine with connection retry logic"""
    retries = 0
    last_exception = None

    while retries < MAX_RETRIES:
        try:
            logger.info(f"Attempting to connect to database (attempt {retries + 1}/{MAX_RETRIES})...")
            engine = create_engine(
                SQLALCHEMY_DATABASE_URL,
                pool_pre_ping=True,
                echo=True  # Log all SQL queries for debugging
            )
            # Test connection
            connection = engine.connect()
            connection.close()
            logger.info("Database connection established successfully")
            return engine
        except Exception as e:
            last_exception = e
            retries += 1
            logger.error(f"Database connection attempt {retries} failed: {str(e)}")
            if retries < MAX_RETRIES:
                logger.info(f"Retrying in {RETRY_DELAY} seconds...")
                time.sleep(RETRY_DELAY)

    logger.error("Maximum connection retries reached. Could not connect to database.")
    raise last_exception


# Initialize engine with retry logic
try:
    engine = get_engine()
except Exception as e:
    logger.error(f"Failed to initialize database: {str(e)}")
    # Don't crash the app, but log the error
    engine = None

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) if engine else None

Base = declarative_base()


# Dependency to get database session
def get_db():
    if SessionLocal is None:
        raise Exception("Database connection failed during startup")

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()