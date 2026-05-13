import React, { useState, useEffect } from 'react'
import { businessAPI } from './api'
import './styles/App.css'
import SearchBar from './components/SearchBar'
import BusinessForm from './components/BusinessForm'
import BusinessList from './components/BusinessList'
import StatsCard from './components/StatsCard'

function App() {
  const [businesses, setBusinesses] = useState([])
  const [filteredBusinesses, setFilteredBusinesses] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [stats, setStats] = useState({ total: 0, byCategory: {}, byCity: {} })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // Fetch all businesses
  const fetchBusinesses = async (page = 1) => {
    setLoading(true)
    try {
      const response = await businessAPI.getAll(page, 10)
      setBusinesses(response.data.data)
      setFilteredBusinesses(response.data.data)
      setTotalResults(response.data.total)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error fetching businesses:', error)
      alert('Failed to load businesses')
    } finally {
      setLoading(false)
    }
  }

  // Search businesses
  const handleSearch = async (searchParams) => {
    setLoading(true)
    try {
      const response = await businessAPI.search(searchParams)
      setFilteredBusinesses(response.data.data)
      setTotalResults(response.data.total)
      setCurrentPage(1)
    } catch (error) {
      console.error('Error searching businesses:', error)
      alert('Failed to search businesses')
    } finally {
      setLoading(false)
    }
  }

  // Handle business added
  const handleBusinessAdded = () => {
    setShowForm(false)
    fetchBusinesses(1)
  }

  // Handle business deleted
  const handleBusinessDeleted = () => {
    fetchBusinesses(currentPage)
  }

  // Load initial data
  useEffect(() => {
    fetchBusinesses(1)
  }, [])

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>🇮🇳 India Business Finder</h1>
              <p>Find and manage business leads across India</p>
            </div>
            <button
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '❌ Cancel' : '➕ Add Business'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Add Business Form */}
          {showForm && (
            <div className="card form-container">
              <BusinessForm onSuccess={handleBusinessAdded} />
            </div>
          )}

          {/* Search Bar */}
          <div className="card search-container">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <StatsCard
              title="Total Businesses"
              value={totalResults}
              icon="📊"
            />
            <StatsCard
              title="Loaded"
              value={filteredBusinesses.length}
              icon="📋"
            />
          </div>

          {/* Business List */}
          <div className="card">
            <BusinessList
              businesses={filteredBusinesses}
              loading={loading}
              onDelete={handleBusinessDeleted}
              onPageChange={fetchBusinesses}
              currentPage={currentPage}
              totalResults={totalResults}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 India Business Finder. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
