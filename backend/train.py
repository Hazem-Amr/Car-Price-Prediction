"""
Training script for the Car Price Prediction model.

Replicates the exact pipeline from the Final Model notebook:
  1. Load Cars_Data.csv
  2. Remove duplicates
  3. Parse registration_date → vehicle_age, drop registration_date
  4. Drop power_kw (perfectly correlated with power_ps)
  5. Logical cleaning: mileage > 0, vehicle_age >= 0
  6. Winsorize price at 1st/99th percentiles
  7. Log-transform target: log_price = log1p(price)
  8. Engineer features: transmission_unknown_flag, km_per_year, log_mileage
  9. Train CatBoostRegressor with native categorical feature support
 10. Save model.pkl and features.pkl via joblib

Usage:
    python train.py
"""

import os
import numpy as np
import pandas as pd
import joblib
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from catboost import CatBoostRegressor


def main():
    # --- 1. Load data ---
    data_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "Car Price Prediction",
        "Cars_Data.csv",
    )
    print(f"Loading data from: {data_path}")
    df = pd.read_csv(data_path)
    print(f"Loaded {df.shape[0]} rows, {df.shape[1]} columns.")

    # --- 2. Remove duplicates ---
    before = len(df)
    df = df.drop_duplicates()
    print(f"Removed {before - len(df)} duplicates. Remaining: {len(df)} rows.")

    # --- 3. Parse date → vehicle_age ---
    df["registration_date"] = pd.to_datetime(
        df["registration_date"],
        format="%d-%m-%y",
        errors="coerce",
    )
    current_year = datetime.now().year
    df["vehicle_age"] = current_year - df["registration_date"].dt.year
    df.drop(columns=["registration_date"], inplace=True)

    # --- 4. Drop power_kw (nearly perfectly correlated with power_ps) ---
    df.drop(columns=["power_kw"], inplace=True)

    # --- 5. Logical cleaning ---
    df = df[df["mileage_in_km"] > 0]
    df = df[df["vehicle_age"] >= 0]
    print(f"After cleaning: {len(df)} rows.")

    # --- 6. Winsorize price ---
    p_low, p_high = df["price"].quantile([0.01, 0.99])
    df["price"] = df["price"].clip(p_low, p_high)

    # --- 7. Log-transform target ---
    df["log_price"] = np.log1p(df["price"])

    # --- 8. Feature engineering ---
    df["transmission_unknown_flag"] = (df["transmission_type"] == "Unknown").astype(int)
    df["km_per_year"] = df["mileage_in_km"] / (df["vehicle_age"] + 1)
    df["log_mileage"] = np.log1p(df["mileage_in_km"])

    # --- 9. Define features & target ---
    target = "log_price"
    cat_cols = [
        "brand",
        "model",
        "color",
        "transmission_type",
        "fuel_type",
    ]
    X = df.drop(columns=["price", "log_price"])
    y = df[target]
    num_cols = [c for c in X.columns if c not in cat_cols]

    all_features = num_cols + cat_cols
    X = X[all_features]

    print(f"Features ({len(all_features)}): {all_features}")
    print(f"Categorical: {cat_cols}")
    print(f"Numerical:   {num_cols}")

    # --- 10. Train / test split ---
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # --- 11. Train CatBoost ---
    print("\nTraining CatBoostRegressor...")
    model = CatBoostRegressor(silent=True, random_seed=42)
    model.fit(X_train, y_train, cat_features=cat_cols)
    print("Training complete.")

    # --- 12. Evaluate ---
    y_pred_log = model.predict(X_test)
    y_test_real = np.expm1(y_test)
    y_pred_real = np.expm1(y_pred_log)

    mae = mean_absolute_error(y_test_real, y_pred_real)
    rmse = np.sqrt(mean_squared_error(y_test_real, y_pred_real))
    r2 = r2_score(y_test_real, y_pred_real)

    print(f"\n=== Evaluation ===")
    print(f"MAE:  {mae:,.2f}")
    print(f"RMSE: {rmse:,.2f}")
    print(f"R²:   {r2:.4f}")

    # --- 13. Save model and features ---
    model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
    features_path = os.path.join(os.path.dirname(__file__), "features.pkl")
    joblib.dump(model, model_path)
    joblib.dump(all_features, features_path)
    print(f"\nModel saved to:    {model_path}")
    print(f"Features saved to: {features_path}")
    print("Done!")


if __name__ == "__main__":
    main()
