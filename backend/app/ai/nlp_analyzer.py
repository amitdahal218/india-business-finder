"""NLP Analyzer - Natural Language Processing"""

class NLPAnalyzer:
    """Analyze business descriptions and extract insights"""
    
    @staticmethod
    def analyze_description(description: str) -> dict:
        """
        Analyze business description to extract insights
        
        Returns:
        - Keywords
        - Services offered
        - Potential needs
        """
        if not description:
            return {
                "keywords": [],
                "services": [],
                "potential_needs": [],
            }
        
        # Keywords for different services
        translation_keywords = [
            "translation", "translator", "multilingual", "language", 
            "interpret", "localization", "transcription"
        ]
        publishing_keywords = [
            "publish", "publication", "book", "author", "manuscript",
            "print", "printing", "edition"
        ]
        education_keywords = [
            "education", "learn", "course", "student", "training",
            "tuition", "class", "study", "academic"
        ]
        
        desc_lower = description.lower()
        
        # Extract keywords
        keywords = []
        services = []
        potential_needs = []
        
        # Check for translation needs
        if any(kw in desc_lower for kw in translation_keywords):
            keywords.extend([kw for kw in translation_keywords if kw in desc_lower])
            potential_needs.append("translation services")
        
        # Check for publishing needs
        if any(kw in desc_lower for kw in publishing_keywords):
            keywords.extend([kw for kw in publishing_keywords if kw in desc_lower])
            services.append("publishing")
            potential_needs.append("book translation")
        
        # Check for education needs
        if any(kw in desc_lower for kw in education_keywords):
            keywords.extend([kw for kw in education_keywords if kw in desc_lower])
            services.append("education")
            potential_needs.append("multilingual content")
        
        return {
            "keywords": list(set(keywords)),
            "services": list(set(services)),
            "potential_needs": list(set(potential_needs)),
        }
