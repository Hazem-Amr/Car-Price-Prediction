"""
FastAPI backend for the Car Price Prediction system.
Loads the trained CatBoost model and serves predictions via POST /predict.
"""

import os
import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import json
from utils import predict_price, CATEGORICAL_FEATURES

# ----- App setup -----
app = FastAPI(title="Car Price Prediction API", version="1.0.0")

# Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- Load model at startup -----
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
FEATURES_PATH = os.path.join(os.path.dirname(__file__), "features.pkl")
OPTIONS_PATH = os.path.join(os.path.dirname(__file__), "options.json")

model = None
features = None
options_data = {}

@app.on_event("startup")
def load_model():
    global model, features, options_data
    if not os.path.exists(MODEL_PATH):
        print(f"WARNING: Model file not found at {MODEL_PATH}. Run train.py first.")
        return
    model = joblib.load(MODEL_PATH)
    if os.path.exists(FEATURES_PATH):
        features = joblib.load(FEATURES_PATH)
    if os.path.exists(OPTIONS_PATH):
        with open(OPTIONS_PATH, "r") as f:
            options_data = json.load(f)
    print("Model and options loaded successfully.")


# ----- Request / Response schemas -----
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


# ----- Endpoints -----
@app.post("/predict", response_model=PredictionResponse)
def predict(req: PredictionRequest):
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please run train.py first.",
        )

    try:
        input_data = req.dict()
        # Rename 'model' field to avoid conflict with Pydantic reserved word
        # The Pydantic model field is 'model' which shadows the global; we use req.dict()
        predicted_price = predict_price(model, input_data)
        return PredictionResponse(predicted_price=predicted_price)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": model is not None}


@app.get("/options")
def get_options():
    """Return dropdown options for the prediction form."""
    return options_data

# ----- Serve Frontend Files -----
FRONTEND_DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))

# Mount assets specifically so they are found
if os.path.isdir(os.path.join(FRONTEND_DIST, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST, "assets")), name="assets")

# Catch-all route to serve index.html for React SPA, or other static files in root
@app.get("/{catchall:path}")
def serve_frontend(catchall: str):
    file_path = os.path.join(FRONTEND_DIST, catchall)
    if catchall and os.path.isfile(file_path):
        return FileResponse(file_path)
    index_path = os.path.join(FRONTEND_DIST, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)
    return {"message": "Frontend not built. Please run npm run build in the frontend directory."}
