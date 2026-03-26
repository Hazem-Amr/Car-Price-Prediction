# Car Price Prediction

## Project Overview
This project focuses on building a robust Machine Learning model to predict the price of used cars based on various features such as brand, model, vehicle age, mileage, power, transmission type, and fuel consumption. 

## Structure
- **Data Exploration & Preprocessing**: The project includes comprehensive notebooks (e.g., `Test_Models.ipynb`, `GraduationProject.ipynb`) that load data (`Cars_Data.csv`), perform exploratory data analysis (EDA), data cleaning, outlier handling (winsorization), and feature engineering (like calculating vehicle age from registration dates and log-transforming variables).
- **Modeling**: Evaluates multiple regression algorithms, including:
  - Linear Regression
  - Decision Tree Regressor
  - Support Vector Regressor (SVR)
  - XGBoost
  - LightGBM
  - CatBoost Regressor (with best model saved as `best_catboost_model.cbm`)
- **Application**: An application script (`app.py`) is provided to deploy and serve the model predictions.

## Dependencies
Major dependencies include `pandas`, `numpy`, `matplotlib`, `seaborn`, `scikit-learn`, `xgboost`, `lightgbm`, and `catboost`.

## Getting Started
1. Clone the repository and install the dependencies.
2. Run the Jupyter notebooks to view the model training process, data visualization, and evaluation metrics.
3. Use the trained model or run the application (`app.py`) to make predictions on new car data.
