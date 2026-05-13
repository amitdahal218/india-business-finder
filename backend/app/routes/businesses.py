"""Business API Routes"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from ..database import get_db
from ..models import Business
from ..schemas import Business as BusinessSchema, BusinessCreate, BusinessUpdate, BusinessList

router = APIRouter(prefix="/api/businesses", tags=["businesses"])


@router.post("/", response_model=BusinessSchema)
def create_business(
    business: BusinessCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new business entry.
    
    Example:
    ```json
    {
        "name": "ABC Coaching Centre",
        "category": "Coaching Centre",
        "city": "Mumbai",
        "state": "Maharashtra",
        "address": "123 Main Street",
        "phone": "+919876543210",
        "email": "info@abc.com",
        "website": "https://abc.com"
    }
    ```
    """
    db_business = Business(**business.dict())
    db.add(db_business)
    db.commit()
    db.refresh(db_business)
    return db_business


@router.get("/", response_model=BusinessList)
def list_businesses(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    List all businesses with pagination.
    
    - **page**: Page number (starting from 1)
    - **per_page**: Number of results per page (max 100)
    """
    skip = (page - 1) * per_page
    
    total = db.query(Business).count()
    businesses = db.query(Business).offset(skip).limit(per_page).all()
    
    return {
        "total": total,
        "page": page,
        "per_page": per_page,
        "data": businesses
    }


@router.get("/search", response_model=BusinessList)
def search_businesses(
    name: str = Query(None),
    category: str = Query(None),
    city: str = Query(None),
    state: str = Query(None),
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Search businesses by name, category, city, or state.
    
    - **name**: Search by business name (partial match)
    - **category**: Filter by category (e.g., "Coaching Centre", "Publisher")
    - **city**: Filter by city
    - **state**: Filter by state
    - **page**: Page number
    - **per_page**: Results per page
    """
    skip = (page - 1) * per_page
    
    # Build query with filters
    query = db.query(Business)
    
    if name:
        query = query.filter(Business.name.ilike(f"%{name}%"))
    
    if category:
        query = query.filter(Business.category.ilike(f"%{category}%"))
    
    if city:
        query = query.filter(Business.city.ilike(f"%{city}%"))
    
    if state:
        query = query.filter(Business.state.ilike(f"%{state}%"))
    
    total = query.count()
    businesses = query.offset(skip).limit(per_page).all()
    
    return {
        "total": total,
        "page": page,
        "per_page": per_page,
        "data": businesses
    }


@router.get("/{business_id}", response_model=BusinessSchema)
def get_business(
    business_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a specific business by ID.
    """
    business = db.query(Business).filter(Business.id == business_id).first()
    
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    
    return business


@router.put("/{business_id}", response_model=BusinessSchema)
def update_business(
    business_id: int,
    business_update: BusinessUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a business entry.
    """
    db_business = db.query(Business).filter(Business.id == business_id).first()
    
    if not db_business:
        raise HTTPException(status_code=404, detail="Business not found")
    
    # Update only provided fields
    update_data = business_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_business, field, value)
    
    db.commit()
    db.refresh(db_business)
    return db_business


@router.delete("/{business_id}")
def delete_business(
    business_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a business entry.
    """
    db_business = db.query(Business).filter(Business.id == business_id).first()
    
    if not db_business:
        raise HTTPException(status_code=404, detail="Business not found")
    
    db.delete(db_business)
    db.commit()
    
    return {"message": f"Business {business_id} deleted successfully"}


@router.get("/stats/categories")
def get_category_stats(db: Session = Depends(get_db)):
    """
    Get statistics of businesses by category.
    """
    categories = db.query(
        Business.category,
        db.func.count(Business.id).label("count")
    ).group_by(Business.category).all()
    
    return {
        "data": [
            {"category": cat, "count": count}
            for cat, count in categories
        ]
    }


@router.get("/stats/cities")
def get_city_stats(db: Session = Depends(get_db)):
    """
    Get statistics of businesses by city.
    """
    cities = db.query(
        Business.city,
        db.func.count(Business.id).label("count")
    ).group_by(Business.city).all()
    
    return {
        "data": [
            {"city": city, "count": count}
            for city, count in cities
        ]
    }
