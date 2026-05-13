import React, { useState } from 'react'
import { businessAPI } from '../api'
import '../styles/BusinessForm.css'

function BusinessForm({ onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    website: '',
    description: '',
  })

  const categories = [
    'Coaching Centre',
    'Book Publisher',
    'Author/Writer',
    'Language Institute',
    'Translation Services',
    'Educational Organisation',
    'Printing Press',
  ]

  const indianStates = [
    'Maharashtra',
    'Karnataka',
    'Tamil Nadu',
    'Uttar Pradesh',
    'Delhi',
    'Rajasthan',
    'Gujarat',
    'West Bengal',
    'Telangana',
    'Andhra Pradesh',
    'Bihar',
    'Madhya Pradesh',
    'Other',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate required fields
    if (!formData.name || !formData.category || !formData.city) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      await businessAPI.create(formData)
      alert('✓ Business added successfully!')
      setFormData({
        name: '',
        category: '',
        address: '',
        city: '',
        state: '',
        phone: '',
        email: '',
        website: '',
        description: '',
      })
      onSuccess()
    } catch (err) {
      console.error('Error creating business:', err)
      setError(err.response?.data?.detail || 'Failed to add business')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="business-form" onSubmit={handleSubmit}>
      <h2>➕ Add New Business</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-row">
        <div className="form-group">
          <label>Business Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter business name"
            required
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select a state</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street address"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Business description..."
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '⏳ Adding...' : '✓ Add Business'}
        </button>
      </div>
    </form>
  )
}

export default BusinessForm
