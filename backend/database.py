"""
SQLite database connection setup using SQLAlchemy.
Creates a local 'cars_database.db' file in the backend directory.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLite database file will be created in the backend/ folder
SQLALCHEMY_DATABASE_URL = "sqlite:///./cars_database.db"

# connect_args={"check_same_thread": False} is required for SQLite with FastAPI
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """
    FastAPI dependency that provides a database session per request.
    Automatically closes the session when the request is done.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
