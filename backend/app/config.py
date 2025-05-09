from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = "postgresql://postgres:postgres@postgres:5432/todo_db"

    # Authentication settings
    JWT_SECRET_KEY: str = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NDQ5OTY3NSwiaWF0IjoxNjg0NDk5Njc1fQ.8O_BNY1M5zqBVfKp7hFPyx5T5oZYm5HUs-JPfVD6Rcs"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30 * 24 * 60  # 30 days

    # CORS settings - changed from list to str to avoid JSON parsing
    ALLOWED_ORIGINS_STR: str = "http://localhost:3000"

    @property
    def ALLOWED_ORIGINS(self) -> List[str]:
        """Parse comma-separated string into a list of origins"""
        origins_str = os.getenv("ALLOWED_ORIGINS", self.ALLOWED_ORIGINS_STR)
        return [origin.strip() for origin in origins_str.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        # Use .env file if available but allow environment variables to override
        env_prefix = ""


settings = Settings()