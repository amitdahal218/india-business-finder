import React, { useState } from 'react'
import { businessAPI } from '../api'
import '../styles/BusinessList.css'

function BusinessList({
  businesses,
  loading,
  onDelete,
  onPageChange,
  currentPage,
  totalResults,
}) {
  const [deleting, setDeleting] = useState(null)

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      setDeleting(id)
      try {
        await businessAPI.delete(id)
        alert('✓ Business deleted successfully!')
        onDelete()
      } catch (error) {
        console.error('Error deleting business:', error)
        alert('Failed to delete business')
      } finally {
        setDeleting(null)
      }
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <p>⏳ Loading businesses...</p>
      </div>
    )
  }

  if (businesses.length === 0) {
    return (
      <div className="no-results">
        <p>📭 No businesses found. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="business-list">
      <h2>📋 Businesses ({totalResults})</h2>

      <div className="list-container">
        {businesses.map((business) => (
          <div key={business.id} className="business-card">
            <div className="card-header">
              <div className="business-title">
                <h3>{business.name}</h3>
                <span className="category-badge">{business.category}</span>
              </div>
              <button
                className="btn-delete"
                onClick={() => handleDelete(business.id)}
                disabled={deleting === business.id}
              >
                {deleting === business.id ? '⏳' : '🗑️'}
              </button>
            </div>

            <div className="card-body">
              <div className="info-row">
                <span className="label">📍 Location:</span>
                <span className="value">
                  {business.address && `${business.address}, `}
                  {business.city}, {business.state}
                </span>
              </div>

              {business.phone && (
                <div className="info-row">
                  <span className="label">☎️ Phone:</span>
                  <a href={`tel:${business.phone}`} className="value">
                    {business.phone}
                  </a>
                </div>
              )}

              {business.email && (
                <div className="info-row">
                  <span className="label">📧 Email:</span>
                  <a href={`mailto:${business.email}`} className="value">
                    {business.email}
                  </a>
                </div>
              )}

              {business.website && (
                <div className="info-row">
                  <span className="label">🌐 Website:</span>
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="value"
                  >
                    {business.website}
                  </a>
                </div>
              )}

              {business.description && (
                <div className="info-row">
                  <span className="label">📝 Description:</span>
                  <span className="value">{business.description}</span>
                </div>
              )}

              {business.rating && (
                <div className="info-row">
                  <span className="label">⭐ Rating:</span>
                  <span className="value">
                    {business.rating} ({business.reviews_count} reviews)
                  </span>
                </div>
              )}
            </div>

            <div className="card-footer">
              <small>Added: {new Date(business.created_at).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Info */}
      <div className="pagination-info">
        <p>
          Showing {Math.min(businesses.length, 10)} of {totalResults} results
          {totalResults > 10 && ` (Page ${currentPage})`}
        </p>
      </div>
    </div>
  )
}

export default BusinessList
