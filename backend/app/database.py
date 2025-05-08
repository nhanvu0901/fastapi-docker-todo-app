from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings
import time
import logging

logger = logging.getLogger(__name__)

# Create SQLAlchemy engine
SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

# Maximum number of retries for database connection
MAX_RETRIES = 5
RETRY_DELAY = 5  # seconds


def get_engine():
    """Create engine with connection retry logic"""
    retries = 0

    while retries < MAX_RETRIES:
        try:
            engine = create_engine(
                SQLALCHEMY_DATABASE_URL,
                pool_pre_ping=True
            )
            # Test connection
            connection = engine.connect()
            connection.close()
            logger.info("Database connection established successfully")
            return engine
        except Exception as e:
            retries += 1
            logger.error(f"Database connection attempt {retries} failed: {str(e)}")
            if retries < MAX_RETRIES:
                logger.info(f"Retrying in {RETRY_DELAY} seconds...")
                time.sleep(RETRY_DELAY)
            else:
                logger.error("Maximum connection retries reached. Could not connect to database.")
                raise


engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()