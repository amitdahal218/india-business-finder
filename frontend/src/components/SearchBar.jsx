import React, { useState } from 'react'
import '../styles/SearchBar.css'

function SearchBar({ onSearch }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    city: '',
    state: '',
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

  const handleSearch = (e) => {
    e.preventDefault()
    // Remove empty fields
    const params = Object.fromEntries(
      Object.entries(formData).filter(([, value]) => value)
    )
    onSearch(params)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      city: '',
      state: '',
    })
    onSearch({})
  }

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <h2>🔍 Search Businesses</h2>

      <div className="search-grid">
        <input
          type="text"
          name="name"
          placeholder="Business name..."
          value={formData.name}
          onChange={handleChange}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category...</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="city"
          placeholder="City..."
          value={formData.city}
          onChange={handleChange}
        />

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option value="">Select State...</option>
          {indianStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="button-group">
        <button type="submit" className="btn-primary">
          🔍 Search
        </button>
        <button type="button" className="btn-secondary" onClick={handleReset}>
          🔄 Reset
        </button>
      </div>
    </form>
  )
}

export default SearchBar
