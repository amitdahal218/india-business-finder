"""Database Models"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Float
from sqlalchemy.sql import func
from .database import Base


class Business(Base):
    """Business Model - Represents a business/organization in the database"""
    
    __tablename__ = "businesses"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Basic Information
    name = Column(String(255), index=True, nullable=False)
    category = Column(String(100), index=True, nullable=False)  # Coaching Centre, Publisher, Author, etc.
    
    # Location Information
    address = Column(Text, nullable=True)
    city = Column(String(100), index=True, nullable=False)
    state = Column(String(100), index=True, nullable=True)
    
    # Contact Information
    phone = Column(String(20), nullable=True)
    email = Column(String(255), nullable=True, index=True)
    website = Column(String(500), nullable=True)
    
    # Google Maps
    google_maps_url = Column(String(500), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # Social Media
    facebook_url = Column(String(500), nullable=True)
    instagram_url = Column(String(500), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    twitter_url = Column(String(500), nullable=True)
    
    # Business Details
    description = Column(Text, nullable=True)
    rating = Column(Float, nullable=True)  # Google rating
    reviews_count = Column(Integer, default=0)
    
    # AI Lead Scoring
    lead_score = Column(String(20), default="Not Scored")  # High, Medium, Low, Not Scored
    lead_notes = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<Business(id={self.id}, name='{self.name}', category='{self.category}')>"
