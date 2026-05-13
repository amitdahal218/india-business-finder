import React from 'react'
import '../styles/StatsCard.css'

function StatsCard({ title, value, icon }) {
  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <p className="stats-label">{title}</p>
        <p className="stats-value">{value}</p>
      </div>
    </div>
  )
}

export default StatsCard
