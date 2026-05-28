"""
FastAPI backend for the Car Price Prediction system.
Loads the trained CatBoost model and serves predictions via POST /predict.
Saves car listings to an SQLite database via POST /cars/sell.
"""

import os
import uuid
import shutil
import joblib
import numpy as np
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import json
from typing import Optional

from utils import predict_price, CATEGORICAL_FEATURES
from database import engine, get_db
import models
import auth
from schemas import PredictionRequest, PredictionResponse, CarResponse, UserCreate, UserLogin, UserResponse, Token

# ----- App setup -----
app = FastAPI(title="Car Price Prediction API", version="1.0.0")

# ----- Create database tables -----
models.Base.metadata.create_all(bind=engine)

# ----- Create uploads folder -----
UPLOADS_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)

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


# ----- Auth Endpoints -----
@app.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = auth.create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

from fastapi import Header
@app.get("/users/me", response_model=UserResponse)
def get_current_user(authorization: str = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    token = authorization.split(" ")[1]
    payload = auth.decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
        
    email = payload.get("sub")
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return db_user


# ----- Car Listing Endpoints -----
@app.post("/cars/sell", response_model=CarResponse)
def sell_car(
    brand: str = Form(...),
    model_name: str = Form(...),
    color: str = Form(...),
    registration_year: int = Form(...),
    power_ps: float = Form(...),
    fuel_type: str = Form(...),
    transmission_type: str = Form(...),
    fuel_consumption: float = Form(...),
    mileage: float = Form(...),
    asking_price: int = Form(...),
    condition: str = Form(""),
    body_type: str = Form(""),
    description: str = Form(""),
    phone: str = Form(""),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    """Save a car listing to the database, along with the AI predicted price."""
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Cannot calculate predicted price.",
        )

    # --- Run the AI prediction ---
    try:
        prediction_input = {
            "brand": brand,
            "model": model_name,
            "color": color,
            "registration_year": registration_year,
            "power_ps": power_ps,
            "fuel_type": fuel_type,
            "transmission_type": transmission_type,
            "fuel_consumption": fuel_consumption,
            "mileage": mileage,
        }
        ai_predicted_price = predict_price(model, prediction_input)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction failed: {str(e)}")

    # --- Save the uploaded image ---
    saved_image_path = None
    if image and image.filename:
        file_ext = os.path.splitext(image.filename)[1]  # e.g. ".jpg"
        unique_filename = f"{uuid.uuid4().hex}{file_ext}"
        file_path = os.path.join(UPLOADS_DIR, unique_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        saved_image_path = f"/uploads/{unique_filename}"

    # --- Save to database ---
    db_car = models.CarForSale(
        brand=brand,
        model_name=model_name,
        color=color,
        registration_year=registration_year,
        power_ps=power_ps,
        fuel_type=fuel_type,
        transmission_type=transmission_type,
        fuel_consumption=fuel_consumption,
        mileage=mileage,
        condition=condition,
        body_type=body_type,
        description=description,
        phone=phone,
        image_path=saved_image_path,
        asking_price=asking_price,
        predicted_price=ai_predicted_price,
    )
    db.add(db_car)
    db.commit()
    db.refresh(db_car)

    return db_car


@app.get("/cars", response_model=list[CarResponse])
def list_cars(db: Session = Depends(get_db)):
    """Return all active (non-deleted) car listings from the database."""
    return db.query(models.CarForSale).filter(models.CarForSale.is_deleted == False).all()


@app.delete("/cars/{car_id}")
def delete_car(car_id: int, authorization: str = Header(None), db: Session = Depends(get_db)):
    """Soft-delete a car listing. Admin only."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    payload = auth.decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    email = payload.get("sub")
    if email != "admin@tara.com":
        raise HTTPException(status_code=403, detail="Forbidden. Admin access required.")
    db_car = db.query(models.CarForSale).filter(models.CarForSale.id == car_id).first()
    if not db_car:
        raise HTTPException(status_code=404, detail="Car not found")
    db_car.is_deleted = True
    db.commit()
    return {"message": "Car moved to trash successfully"}


@app.get("/admin/cars/deleted", response_model=list[CarResponse])
def list_deleted_cars(authorization: str = Header(None), db: Session = Depends(get_db)):
    """Return all soft-deleted cars. Admin only."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    payload = auth.decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("sub") != "admin@tara.com":
        raise HTTPException(status_code=403, detail="Forbidden. Admin access required.")
    return db.query(models.CarForSale).filter(models.CarForSale.is_deleted == True).all()


@app.post("/admin/cars/{car_id}/restore")
def restore_car(car_id: int, authorization: str = Header(None), db: Session = Depends(get_db)):
    """Restore a soft-deleted car. Admin only."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    payload = auth.decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("sub") != "admin@tara.com":
        raise HTTPException(status_code=403, detail="Forbidden. Admin access required.")
    db_car = db.query(models.CarForSale).filter(models.CarForSale.id == car_id).first()
    if not db_car:
        raise HTTPException(status_code=404, detail="Car not found")
    db_car.is_deleted = False
    db.commit()
    return {"message": "Car restored successfully"}


# ----- Serve uploaded images -----
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

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
