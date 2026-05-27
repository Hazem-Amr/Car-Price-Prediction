# Car Price Prediction Project Context

## Project Overview
This project is an end-to-end AI-powered web application that provides intelligent market value estimates for used cars (specifically targeted at the Egyptian market in EGP). 
It features a modern, responsive React frontend integrated with a fast FastAPI backend running a trained CatBoost machine learning model.

## Tech Stack
### Frontend (`/frontend`)
- **Framework**: React (Bootstrapped with Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **Structure**: 
  - `src/components`: Reusable UI components.
  - `src/pages`: Top-level page components.
  - `src/services`: API interaction logic.
  - `src/hooks`: Custom React hooks.
  - `src/layouts`: Page layouts.
  - `src/data`: Static frontend data.

### Backend (`/backend`)
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn
- **Machine Learning**: Pandas, Scikit-learn, CatBoost, Joblib
- **Key Files**:
  - `main.py`: FastAPI application setup, API endpoints, and frontend serving logic.
  - `utils.py`: Helper functions, including the feature engineering pipeline and prediction execution.
  - `train.py`: Script to train the CatBoost model on the dataset.
  - `model.pkl`: The compiled CatBoost model.
  - `features.pkl`: Encoded features needed for inference.
  - `options.json`: Pre-computed dropdown options for the frontend (Brands, Models based on Brand, etc.).

## Architecture & Integration
1. **Frontend-Backend Integration**: The React frontend is compiled (`npm run build`) to the `frontend/dist` directory. The FastAPI backend is configured to statically serve these compiled frontend files. This allows the entire application to be run as a single server from the backend.
2. **Dynamic UI Generation**: The backend exposes an `/options` endpoint that serves `options.json`. The frontend uses this to populate dynamic dropdowns (e.g., ensuring a user can only select a car model that belongs to the selected brand).
3. **Inference Pipeline**: 
   - User submits a form on the frontend.
   - Request is sent to POST `/predict`.
   - `main.py` passes the raw data to `utils.py`.
   - `utils.py` handles feature engineering (e.g., converting registration year to vehicle age, log transformation of mileage).
   - The CatBoost model makes a prediction.
   - The predicted price is converted/scaled appropriately for the market (e.g., to EGP) and returned to the frontend.

## Common Workflows
- **Running the App Locally**:
  1. Build the frontend: `cd frontend && npm install && npm run build`
  2. Start the backend: `cd backend && pip install -r requirements.txt && python -m uvicorn main:app --reload`
  3. Access at: `http://127.0.0.1:8000`
- **Updating the Model**: 
  - Make changes to `train.py`.
  - Run `train.py` to overwrite `model.pkl`, `features.pkl`, and `options.json`.
  - Restart the backend server.

## Code Conventions
- Provide clear type hints and utilize Pydantic models (like `PredictionRequest` and `PredictionResponse`) in the FastAPI backend.
- Ensure the frontend adheres to Tailwind CSS utility classes and maintains responsive design principles.
- Use environment variables or relative paths cleanly to ensure the backend can always locate the frontend `dist` directory and ML models.
