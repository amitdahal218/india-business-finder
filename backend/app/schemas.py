"""Pydantic Schemas for Request/Response Validation"""

from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime


class BusinessBase(BaseModel):
    """Base schema for Business data"""
    name: str
    category: str
    address: Optional[str] = None
    city: str
    state: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    google_maps_url: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    description: Optional[str] = None
    rating: Optional[float] = None
    reviews_count: Optional[int] = 0


class BusinessCreate(BusinessBase):
    """Schema for creating a new business"""
    pass


class BusinessUpdate(BaseModel):
    """Schema for updating a business"""
    name: Optional[str] = None
    category: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    google_maps_url: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    description: Optional[str] = None
    rating: Optional[float] = None
    reviews_count: Optional[int] = None
    lead_score: Optional[str] = None
    lead_notes: Optional[str] = None


class Business(BusinessBase):
    """Schema for reading business data"""
    id: int
    lead_score: str
    lead_notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class BusinessList(BaseModel):
    """Schema for listing businesses with pagination"""
    total: int
    page: int
    per_page: int
    data: list[Business]
