# Jira Epic & Task Breakdown

This document breaks down the **Car Price Prediction System** into manageable Epics, Tasks, and Subtasks suitable for importing into Jira or any agile project management tool.

---

## 🟢 Epic 1: Data Engineering & Machine Learning
**Description:** Analyze raw vehicle data, preprocess it, perform feature engineering, and train a high-performing machine learning model (CatBoost) to predict car prices.

### Task 1.1: Exploratory Data Analysis (EDA) & Data Cleaning
- **Description:** Analyze the `Cars_Data.csv` dataset to identify missing values, outliers, and data distributions. Clean the data to prepare it for modeling.
- **Acceptance Criteria:**
  - Missing data handled (imputed or dropped).
  - Outliers in price, mileage, and power addressed.
  - Correlation analysis complete.
  - Initial dataset ready for modeling.

### Task 1.2: Feature Engineering
- **Description:** Create new or transform existing features to improve model performance based on EDA insights.
- **Acceptance Criteria:**
  - Categorical variables encoded.
  - Continuous variables scaled/normalized if necessary.
  - Feature list serialized and saved (`features.pkl` structure planned).

### Task 1.3: Model Training & Evaluation (CatBoost)
- **Description:** Test different machine learning regressors and evaluate them. Train the final CatBoost Regressor.
- **Acceptance Criteria:**
  - Multiple algorithms tested and compared.
  - Final CatBoost model tuned and achieves R² ≈ 0.94.
  - Evaluation metrics (MAE, RMSE, R²) documented.

---

## 🔵 Epic 2: Backend API Development
**Description:** Build a robust and scalable REST API using FastAPI to serve the trained machine learning model to the frontend application.

### Task 2.1: Project Setup & Environment Configuration
- **Description:** Initialize backend folder structure and python environment.
- **Acceptance Criteria:**
  - Python virtual environment created.
  - `requirements.txt` installed and finalized.
  - Base directory structure established.

### Task 2.2: Develop Automated Training Script (`train.py`)
- **Description:** Convert Jupyter Notebook training logic into an executable Python script to enable easy, repeatable model retraining.
- **Acceptance Criteria:**
  - Script successfully loads raw data and trains model.
  - Saves `model.pkl` and `features.pkl` upon successful run.

### Task 2.3: Implement Prediction Utilities (`utils.py`)
- **Description:** Extract reusable functions that match the exact data transformations used during the model training phase.
- **Acceptance Criteria:**
  - Input JSON correctly mapped to model feature structure.
  - Transformations apply successfully on single-record API requests.

### Task 2.4: Create FastAPI Endpoints (`main.py`)
- **Description:** Expose routes for prediction, health-check, and dynamic options fetching.
- **Acceptance Criteria:**
  - `GET /health` endpoint created and returns status.
  - `GET /options` endpoint returns valid dropdown keys.
  - `POST /predict` accepts payload, passes to model, and returns estimated price.

---

## 🟣 Epic 3: Frontend Web Development
**Description:** Build a responsive, user-friendly, and visually appealing web interface using React and Tailwind CSS for users to input car details and receive price predictions.

### Task 3.1: Frontend Scaffolding & Setup
- **Description:** Initialize the React frontend with Vite and configure Tailwind CSS v4.
- **Acceptance Criteria:**
  - Vite React application runs locally without errors.
  - Tailwind directives configured in `index.css`.

### Task 3.2: Implement Global Design System & CSS
- **Description:** Apply base styles and the glassmorphic dark theme based on the project's visual identity.
- **Acceptance Criteria:**
  - `index.css` layout, background, animations, and CSS variables added.

### Task 3.3: Develop Prediction Form UI (`App.jsx`)
- **Description:** Build the main form capturing car features like Brand, Model, Year, Mileage, and Power.
- **Acceptance Criteria:**
  - All requisite form fields implemented.
  - Proper state management (useState) implemented for form values.
  - Form validation handling correct inputs.

### Task 3.4: Integrate API & Present Predictions
- **Description:** Connect the React frontend form to the FastAPI backend to fetch price predictions.
- **Acceptance Criteria:**
  - Frontend successfully makes a POST request to `/predict`.
  - Loading states (spinners) handled during the fetch.
  - Price format styled elegantly for the user upon success.

---

## 🟠 Epic 4: DevOps, Integration & Documentation
**Description:** Stitch together the frontend and backend layers, test the total application flow, and document the project setup.

### Task 4.1: End-to-End System Testing
- **Description:** Run frontend and backend servers concurrently to verify end-to-end functionality.
- **Acceptance Criteria:**
  - Model successfully predicts a real input from the UI.
  - Cross-Origin Resource Sharing (CORS) correctly configured.
  - Error messages gracefully handled on screen.

### Task 4.2: Draft Technical Project README
- **Description:** Write a comprehensive `README.md` covering prerequisites, setup logic, and architecture.
- **Acceptance Criteria:**
  - Clear explanations of the architecture stack.
  - Working copy/paste commands to install dependencies and run locally.

---

## 🔴 Epic 5: Academic Deliverables (Graduation Project)
**Description:** Compile all code structure, workflows, and diagrams into a formalized academic research and graduation document.

### Task 5.1: Create System Use Case Diagrams
- **Description:** Draw technical, logical, and user workflow diagrams mapping out the complete architecture.
- **Acceptance Criteria:**
  - Use case diagram completed.
  - Sequence diagram mapping API data flow completed.

### Task 5.2: Finalize Graduation Project Documentation
- **Description:** Format, review, and finalize the official project document (aiming for standard 70-page depth).
- **Acceptance Criteria:**
  - Complete document structure with Introduction, AI modeling process, Full-Stack Architecture, and Conclusion.
  - `.docx` and `.pdf` files compiled and stored in the repository.
