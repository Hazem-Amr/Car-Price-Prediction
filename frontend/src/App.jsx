import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:8000'

const INITIAL_FORM = {
  brand: '',
  model: '',
  color: '',
  registration_year: '',
  power_ps: '',
  fuel_type: '',
  transmission_type: '',
  fuel_consumption: '',
  mileage: '',
}

function App() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [options, setOptions] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch dropdown options on mount
  useEffect(() => {
    fetch(`${API_URL}/options`)
      .then((r) => r.json())
      .then(setOptions)
      .catch(() => setError('Could not connect to the server. Make sure the backend is running.'))
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)

    try {
      const payload = {
        ...form,
        registration_year: parseInt(form.registration_year, 10),
        power_ps: parseFloat(form.power_ps),
        fuel_consumption: parseFloat(form.fuel_consumption),
        mileage: parseFloat(form.mileage),
      }

      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail || 'Prediction failed')
      }

      const data = await res.json()
      setResult(data.predicted_price)
    } catch (err) {
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price)

  const isFormValid = Object.values(form).every((v) => v !== '')

  return (
    <div className="app-container">
      {/* Background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <header className="app-header">
        <div className="header-icon">🚗</div>
        <h1 className="header-title">
          Car Price <span className="gradient-text">Prediction</span>
        </h1>
        <p className="header-subtitle">
          AI-powered pricing engine · Powered by CatBoost
        </p>
      </header>

      <main className="glass main-card">
        <form onSubmit={handleSubmit} id="prediction-form">
          <div className="form-grid">
            {/* Brand */}
            <div className="form-group">
              <label className="label" htmlFor="brand">Brand</label>
              <select
                id="brand"
                name="brand"
                className="glass-input"
                value={form.brand}
                onChange={handleChange}
                required
              >
                <option value="">Select brand…</option>
                {options?.brands?.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div className="form-group">
              <label className="label" htmlFor="model">Model</label>
              <input
                id="model"
                name="model"
                type="text"
                className="glass-input"
                placeholder="e.g. Kuga, A4, 320i"
                value={form.model}
                onChange={handleChange}
                required
              />
            </div>

            {/* Color */}
            <div className="form-group">
              <label className="label" htmlFor="color">Color</label>
              <select
                id="color"
                name="color"
                className="glass-input"
                value={form.color}
                onChange={handleChange}
                required
              >
                <option value="">Select color…</option>
                {options?.colors?.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Registration Year */}
            <div className="form-group">
              <label className="label" htmlFor="registration_year">Registration Year</label>
              <input
                id="registration_year"
                name="registration_year"
                type="number"
                className="glass-input"
                placeholder="e.g. 2018"
                min="1990"
                max="2026"
                value={form.registration_year}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mileage */}
            <div className="form-group">
              <label className="label" htmlFor="mileage">Mileage (km)</label>
              <input
                id="mileage"
                name="mileage"
                type="number"
                className="glass-input"
                placeholder="e.g. 50000"
                min="1"
                value={form.mileage}
                onChange={handleChange}
                required
              />
            </div>

            {/* Power */}
            <div className="form-group">
              <label className="label" htmlFor="power_ps">Power (PS)</label>
              <input
                id="power_ps"
                name="power_ps"
                type="number"
                className="glass-input"
                placeholder="e.g. 140"
                min="1"
                value={form.power_ps}
                onChange={handleChange}
                required
              />
            </div>

            {/* Fuel Type */}
            <div className="form-group">
              <label className="label" htmlFor="fuel_type">Fuel Type</label>
              <select
                id="fuel_type"
                name="fuel_type"
                className="glass-input"
                value={form.fuel_type}
                onChange={handleChange}
                required
              >
                <option value="">Select fuel…</option>
                {options?.fuel_types?.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Transmission */}
            <div className="form-group">
              <label className="label" htmlFor="transmission_type">Transmission</label>
              <select
                id="transmission_type"
                name="transmission_type"
                className="glass-input"
                value={form.transmission_type}
                onChange={handleChange}
                required
              >
                <option value="">Select transmission…</option>
                {options?.transmission_types?.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Fuel Consumption */}
            <div className="form-group full-width">
              <label className="label" htmlFor="fuel_consumption">Fuel Consumption (L/100km)</label>
              <input
                id="fuel_consumption"
                name="fuel_consumption"
                type="number"
                className="glass-input"
                placeholder="e.g. 6.5"
                min="0"
                step="0.1"
                value={form.fuel_consumption}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading || !isFormValid}
            id="predict-btn"
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" />
                Predicting…
              </span>
            ) : (
              '⚡ Predict Price'
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="error-message fade-in" id="error-display">
            <span className="error-icon">⚠️</span> {error}
          </div>
        )}

        {/* Result */}
        {result !== null && !error && (
          <div className="price-display fade-in" id="result-display">
            <p className="price-label">Estimated Price</p>
            <p className="price-value">{formatPrice(result)}</p>
            <p className="price-note">Based on market data analysis</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with CatBoost ML · R² ≈ 0.94 accuracy</p>
      </footer>
    </div>
  )
}

export default App
