from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Gemini Configuration
    GEMINI_API_KEY: str
    GEMINI_MODEL: str = "gemini-1.5-flash"
    
    # Grok Configuration
    GROK_API_KEY: str
    GROK_MODEL: str = "grok-2-1212"
    
    # Backend Configuration
    BACKEND_API_URL: str = "http://localhost:4200"
    BACKEND_API_KEY: str = ""
    
    # ChromaDB Configuration
    CHROMA_PATH: str = "./chroma_db"
    
    # JWT Configuration
    JWT_SECRET: str = "123"
    
    # Server Configuration
    AI_SERVICE_PORT: int = 8000
    AI_SERVICE_URL: str = "http://localhost:8000"
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()