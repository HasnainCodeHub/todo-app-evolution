# Configuration Module
# Phase 2.1: Database Persistence Layer + Phase 2.3: JWT Authentication
# Task ID: T005 (Foundational), T002 (Phase 2.3)

import os
from functools import lru_cache

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings:
    """
    Application settings loaded from environment variables.

    Implements:
    - FR-010 (Phase 2.1): Read database connection string from environment variable.
    - FR-015 (Phase 2.3): Read JWT secret from environment configuration.
    """

    def __init__(self):
        self.database_url: str = os.getenv("DATABASE_URL", "")

        # JWT Configuration (Phase 2.3)
        self.jwt_secret: str = os.getenv("JWT_SECRET", "")
        self.jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")

        if not self.database_url:
            raise ValueError(
                "DATABASE_URL environment variable is required. "
                "Please set it in your .env file or environment."
            )

        if not self.jwt_secret:
            raise ValueError(
                "JWT_SECRET environment variable is required. "
                "Please set it in your .env file or environment."
            )

    @property
    def database_url_sync(self) -> str:
        """
        Return the database URL for synchronous operations.
        Ensures compatibility with psycopg2 driver.
        """
        # Neon URLs may use postgresql:// or postgres://
        # SQLModel/SQLAlchemy prefer postgresql://
        url = self.database_url
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        return url


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    Uses lru_cache to avoid reloading environment on each call.
    """
    return Settings()
