"""
Feature engineering utilities for the Car Price Prediction backend.
Replicates the exact feature engineering from the training pipeline.
"""

import numpy as np
import pandas as pd
from datetime import datetime


# Exact feature order used during training
NUMERICAL_FEATURES = [
    "power_ps",
    "fuel_consumption_l_100km.1",
    "mileage_in_km",
    "vehicle_age",
    "transmission_unknown_flag",
    "km_per_year",
    "log_mileage",
]

CATEGORICAL_FEATURES = [
    "brand",
    "model",
    "color",
    "transmission_type",
    "fuel_type",
]

ALL_FEATURES = NUMERICAL_FEATURES + CATEGORICAL_FEATURES


def engineer_features(input_data: dict) -> pd.DataFrame:
    """
    Takes raw API input and produces a DataFrame with the exact
    feature columns used in training, in the correct order.

    Input fields:
      - brand, model, color, transmission_type, fuel_type  (str)
      - registration_year  (int)
      - power_ps           (float/int)
      - fuel_consumption   (float)   → mapped to 'fuel_consumption_l_100km.1'
      - mileage            (float/int)  → mapped to 'mileage_in_km'

    Engineered fields:
      - vehicle_age = current_year - registration_year
      - km_per_year = mileage / (vehicle_age + 1)
      - log_mileage = log1p(mileage)
      - transmission_unknown_flag = 1 if transmission_type == "Unknown" else 0
    """

    current_year = datetime.now().year

    # --- Derived features ---
    vehicle_age = current_year - int(input_data["registration_year"])
    mileage = float(input_data["mileage"])
    km_per_year = mileage / (vehicle_age + 1)
    log_mileage = float(np.log1p(mileage))
    transmission_unknown_flag = 1 if str(input_data["transmission_type"]) == "Unknown" else 0

    row = {
        # Numerical
        "power_ps": float(input_data["power_ps"]),
        "fuel_consumption_l_100km.1": float(input_data["fuel_consumption"]),
        "mileage_in_km": mileage,
        "vehicle_age": vehicle_age,
        "transmission_unknown_flag": transmission_unknown_flag,
        "km_per_year": km_per_year,
        "log_mileage": log_mileage,
        # Categorical
        "brand": str(input_data["brand"]),
        "model": str(input_data["model"]),
        "color": str(input_data["color"]),
        "transmission_type": str(input_data["transmission_type"]),
        "fuel_type": str(input_data["fuel_type"]),
    }

    df = pd.DataFrame([row])

    # Reorder columns to match training feature order exactly
    df = df[ALL_FEATURES]

    return df


def predict_price(model, input_data: dict) -> float:
    """
    Runs feature engineering, predicts log_price, and converts back
    to real price via expm1.
    """
    df = engineer_features(input_data)
    log_price = model.predict(df)[0]
    price = float(np.expm1(log_price))
    return round(price)
