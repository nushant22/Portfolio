from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database (Using SQLite for easier setup)
    DATABASE_URL: str = "sqlite:///./portfolio.db"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    FRONTEND_URL: str = "http://localhost:3000"
    
    # Admin User
    ADMIN_EMAIL: str = "admin@portfolio.com"
    ADMIN_PASSWORD: str = "admin123"  # Must be <= 72 characters for bcrypt
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
