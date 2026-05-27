"""
SQLAlchemy ORM model for the cars_for_sale table.
Defines the database schema for car listings.
"""

from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func
from database import Base


class CarForSale(Base):
    __tablename__ = "cars_for_sale"

    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String, index=True, nullable=False)
    model_name = Column(String, nullable=False)
    color = Column(String)
    registration_year = Column(Integer, nullable=False)
    power_ps = Column(Float)
    fuel_type = Column(String)
    transmission_type = Column(String)
    fuel_consumption = Column(Float)
    mileage = Column(Float)
    condition = Column(String)               # Excellent, Good, Fair
    body_type = Column(String)               # Sedan, SUV, Hatchback, etc.
    description = Column(Text)               # Free-text description from the seller
    phone = Column(String)                   # Seller contact number
    image_path = Column(String)              # Path to the uploaded image file
    asking_price = Column(Integer, nullable=False)      # What the user wants
    predicted_price = Column(Integer, nullable=True)     # What the AI predicts
    created_at = Column(DateTime, server_default=func.now())  # When the listing was created
