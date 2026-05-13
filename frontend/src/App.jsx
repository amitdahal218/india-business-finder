import React, { useState } from 'react'
import { authAPI } from '../services/api'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await authAPI.login({ email, password })
      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('user', JSON.stringify(response.data))
      setIsLoggedIn(true)
      setError('')
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
          <h1>India Business Intelligence Platform</h1>
          <p style={{ marginBottom: '2rem', color: 'var(--gray-500)' }}>Sign in to your account</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
              Sign In
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}
            >No account? <a href="#">Sign up here</a></p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--gray-100)' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid var(--gray-200)' }}>
        <div className="container" style={{ padding: '1.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>🇮🇳 Business Intelligence</h1>
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem 1rem' }}>
        <div className="container">
          <div className="card">
            <h2>Welcome to India Business Intelligence Platform</h2>
            <p>This is your enterprise dashboard for business discovery and lead management.</p>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div className="card">
                <h3>📊 Total Businesses</h3>
                <p style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>0</p>
              </div>
              <div className="card">
                <h3>🎯 Active Leads</h3>
                <p style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>0</p>
              </div>
              <div className="card">
                <h3>⭐ High Priority</h3>
                <p style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>0</p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--gray-100)', borderRadius: '0.5rem' }}>
              <h3>Getting Started</h3>
              <ul style={{ marginLeft: '1.5rem' }}>
                <li>✅ Backend API is running on http://localhost:8000</li>
                <li>✅ Database connected</li>
                <li>✅ Frontend connected to backend</li>
                <li>📖 View API docs: <a href="http://localhost:8000/api/docs" target="_blank" rel="noopener noreferrer">http://localhost:8000/api/docs</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
