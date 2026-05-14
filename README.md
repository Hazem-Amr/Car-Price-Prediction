# Car Price Prediction System

An end-to-end AI-powered web application that provides intelligent market value estimates for used cars. It features a modern, responsive React frontend integrated with a fast FastAPI backend running a trained CatBoost machine learning model.

---

## Architecture

The project is structured into two main components that are cleanly separated but operate together seamlessly:

- **Frontend (`/frontend`)**: Built with React, Vite, and Tailwind CSS. It provides a user-friendly interface with dynamic dropdowns (e.g., Models filter intelligently based on the selected Brand) and communicates with the AI API.
- **Backend (`/backend`)**: Built with FastAPI. It loads the pre-trained CatBoost model (`model.pkl`) and feature definitions (`features.pkl`) into memory. It handles the mathematical feature engineering pipeline, generates price predictions, and natively serves the compiled frontend application.

## Getting Started

Follow these steps to set up and run the application on your local machine.

### Prerequisites
- **Python 3.8+**
- **Node.js 18+**

### 1. Build the Frontend
Since the FastAPI backend is configured to natively serve the frontend files, you must build the frontend first.

```bash
cd frontend
npm install
npm run build
```
*(This generates the `frontend/dist` folder which the backend will serve).*

### 2. Set Up the Backend
Install the necessary Python packages to run the API and AI model.

```bash
cd ../backend
pip install -r requirements.txt
```

### 3. Run the Application
Start the FastAPI server. Because of the integration, starting the backend starts the entire application.

```bash
# Ensure you are still in the backend directory
python -m uvicorn main:app --reload
```

### 4. Use the App
Open your web browser and navigate to:
**[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## How the AI Works

1. **Training**: The AI was trained on a dataset of thousands of vehicle records (`Cars_Data.csv`) using CatBoost. The pipeline handles data cleaning, outlier clipping, and logarithmic transformations on the price target.
2. **Inference**: When you submit the form, the backend receives raw vehicle data. It internally translates this into the mathematical features the model expects (e.g., calculating `vehicle_age` from the registration year, generating `log_mileage`).
3. **Dynamic Options**: To ensure users only input valid data, the backend reads all known brands, models, and features from an `options.json` file and provides them to the frontend on load.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Python, FastAPI, Uvicorn
- **Machine Learning**: Pandas, Scikit-learn, CatBoost, Joblib
