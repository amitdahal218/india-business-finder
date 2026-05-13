"""Database Initialization Script"""

import os
import sys

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.app.database import engine, Base
from backend.app.models import Business


def init_database():
    """
    Initialize the database by creating all tables.
    """
    print("Initializing database...")
    
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print("✓ Database initialized successfully!")
        print("✓ Tables created:")
        print("  - businesses")
        
        # Optional: Add sample data
        from sqlalchemy.orm import sessionmaker
        Session = sessionmaker(bind=engine)
        session = Session()
        
        # Check if data already exists
        existing_count = session.query(Business).count()
        if existing_count == 0:
            print("\n✓ Adding sample data...")
            
            sample_businesses = [
                Business(
                    name="ABC Coaching Centre",
                    category="Coaching Centre",
                    city="Mumbai",
                    state="Maharashtra",
                    address="123 Main Street, Bandra",
                    phone="+919876543210",
                    email="info@abccoaching.com",
                    website="https://abccoaching.com",
                    description="Leading coaching centre for IIT preparation",
                    rating=4.5,
                    reviews_count=120
                ),
                Business(
                    name="Tech Publishers India",
                    category="Book Publisher",
                    city="Bangalore",
                    state="Karnataka",
                    address="456 Tech Park, Whitefield",
                    phone="+918765432109",
                    email="contact@techpublishers.com",
                    website="https://techpublishers.com",
                    description="Publishing technology and IT books",
                    rating=4.2,
                    reviews_count=85
                ),
                Business(
                    name="Creative Writers Academy",
                    category="Language Institute",
                    city="Delhi",
                    state="Delhi",
                    address="789 Knowledge Block, Connaught Place",
                    phone="+919123456789",
                    email="info@creativewriters.com",
                    website="https://creativewriters.com",
                    description="Institute for creative writing and translation",
                    rating=4.7,
                    reviews_count=200
                ),
                Business(
                    name="Raj Publications",
                    category="Book Publisher",
                    city="Chennai",
                    state="Tamil Nadu",
                    address="321 Printing Complex, Nungambakkam",
                    phone="+919876512345",
                    email="raj@rajpublications.com",
                    website="https://rajpublications.com",
                    description="Multi-language book publisher",
                    rating=4.0,
                    reviews_count=95
                ),
            ]
            
            session.add_all(sample_businesses)
            session.commit()
            session.close()
            print("✓ Sample data added successfully!")
        else:
            print(f"\n✓ Database already has {existing_count} business entries")
            session.close()
        
        print("\n✓ Ready to use! Start the backend with: python backend/run.py")
        
    except Exception as e:
        print(f"✗ Error initializing database: {e}")
        sys.exit(1)


if __name__ == "__main__":
    init_database()
