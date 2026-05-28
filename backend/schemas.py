"""
Pydantic schemas for API request/response validation.
"""

from pydantic import BaseModel, Field
from typing import Optional


# ----- Prediction Schemas (existing logic) -----

class PredictionRequest(BaseModel):
    brand: str = Field(..., example="ford")
    model: str = Field(..., example="Kuga")
    color: str = Field(..., example="black")
    registration_year: int = Field(..., example=2018)
    power_ps: float = Field(..., example=140)
    fuel_type: str = Field(..., example="Petrol")
    transmission_type: str = Field(..., example="Automatic")
    fuel_consumption: float = Field(..., example=6.5)
    mileage: float = Field(..., example=50000)


class PredictionResponse(BaseModel):
    predicted_price: int


# ----- Auth Schemas -----

class UserCreate(BaseModel):
    full_name: str = Field(..., example="John Doe")
    email: str = Field(..., example="john@example.com")
    password: str = Field(..., example="secret123")

class UserLogin(BaseModel):
    email: str = Field(..., example="john@example.com")
    password: str = Field(..., example="secret123")

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str


# ----- Car Listing Schemas -----

class CarResponse(BaseModel):
    """Schema for returning a saved car listing."""
    id: int
    brand: str
    model_name: str
    color: str
    registration_year: int
    power_ps: float
    fuel_type: str
    transmission_type: str
    fuel_consumption: float
    mileage: float
    condition: Optional[str] = None
    body_type: Optional[str] = None
    description: Optional[str] = None
    phone: Optional[str] = None
    image_path: Optional[str] = None
    asking_price: int
    predicted_price: Optional[int] = None

    class Config:
        from_attributes = True
