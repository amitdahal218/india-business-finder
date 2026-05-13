-- India Business Finder Database Schema
-- SQLite

CREATE TABLE IF NOT EXISTS businesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Basic Information
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    
    -- Location Information
    address TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    
    -- Contact Information
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(500),
    
    -- Google Maps
    google_maps_url VARCHAR(500),
    latitude FLOAT,
    longitude FLOAT,
    
    -- Social Media
    facebook_url VARCHAR(500),
    instagram_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    twitter_url VARCHAR(500),
    
    -- Business Details
    description TEXT,
    rating FLOAT,
    reviews_count INTEGER DEFAULT 0,
    
    -- AI Lead Scoring
    lead_score VARCHAR(20) DEFAULT 'Not Scored',
    lead_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster searching
CREATE INDEX idx_name ON businesses(name);
CREATE INDEX idx_category ON businesses(category);
CREATE INDEX idx_city ON businesses(city);
CREATE INDEX idx_state ON businesses(state);
CREATE INDEX idx_email ON businesses(email);
CREATE INDEX idx_lead_score ON businesses(lead_score);
