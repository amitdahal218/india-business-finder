"""OpenAI Integration"""

from app.core.config import settings


class OpenAIClient:
    """OpenAI/Claude Integration for AI features"""
    
    @staticmethod
    def generate_summary(business_data: dict) -> str:
        """
        Generate AI summary of business
        
        In production, this would call OpenAI API
        """
        business_name = business_data.get("name", "Unknown")
        category = business_data.get("category", "Business")
        
        # Mock implementation
        summary = f"""{business_name} is a {category} located in {business_data.get('city', 'India')}. 
Based on their ratings and reviews, they appear to be a well-established business offering quality services. 
Potential opportunity for partnership in translation and multilingual services."""
        
        return summary
    
    @staticmethod
    def predict_services(business_data: dict) -> list:
        """
        Predict which services this business might need
        
        Returns list of services like: ['translation', 'transcription', 'subtitle']
        """
        category = business_data.get("category", "").lower()
        
        services = []
        
        # Prediction logic
        if any(cat in category for cat in ["publishing", "author", "writer"]):
            services.extend(["translation", "transcription", "subtitle"])
        elif any(cat in category for cat in ["coaching", "education", "institute", "school"]):
            services.extend(["translation", "transcription", "multilingual"])
        elif any(cat in category for cat in ["printing", "press"]):
            services.extend(["translation", "localization", "document"])
        elif any(cat in category for cat in ["language", "translation"]):
            services.extend(["transcription", "subtitle", "localization"])
        
        return list(set(services))  # Remove duplicates
