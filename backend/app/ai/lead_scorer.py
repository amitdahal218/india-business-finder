"""Lead Scorer - AI Lead Scoring Engine"""

class LeadScorer:
    """Score leads based on business characteristics"""
    
    @staticmethod
    def score_lead(business_data: dict) -> dict:
        """
        Score a lead on 0-100 scale
        
        Factors:
        - Category match (40 points)
        - Business size (30 points)
        - Location (20 points)
        - Online presence (10 points)
        """
        score = 0
        reasoning = []
        
        # Category scoring
        high_value_categories = [
            "Coaching Centre",
            "University",
            "College",
            "Book Publisher",
            "Language Institute",
        ]
        
        if business_data.get("category") in high_value_categories:
            score += 40
            reasoning.append("High-value business category")
        elif business_data.get("category"):
            score += 20
            reasoning.append("Moderate-value category")
        
        # Rating-based scoring
        rating = business_data.get("rating", 0)
        if rating >= 4.5:
            score += 20
            reasoning.append("Excellent rating (4.5+)")
        elif rating >= 4.0:
            score += 15
            reasoning.append("Good rating (4.0+)")
        elif rating >= 3.5:
            score += 10
            reasoning.append("Average rating (3.5+)")
        
        # Reviews-based scoring
        reviews = business_data.get("reviews_count", 0)
        if reviews > 100:
            score += 10
            reasoning.append("High review count (100+)")
        elif reviews > 50:
            score += 5
            reasoning.append("Moderate reviews (50+)")
        
        # Online presence
        if business_data.get("website"):
            score += 3
            reasoning.append("Has website")
        if business_data.get("email"):
            score += 2
            reasoning.append("Has email")
        if business_data.get("phone"):
            score += 2
            reasoning.append("Has phone")
        
        # Social media
        social_count = sum([
            1 for url in [business_data.get("facebook_url"),
                         business_data.get("instagram_url"),
                         business_data.get("linkedin_url")]
            if url
        ])
        score += min(social_count * 2, 6)  # Max 6 points
        if social_count > 0:
            reasoning.append(f"Active on {social_count} social media platforms")
        
        return {
            "score": min(score, 100),  # Cap at 100
            "reasoning": " | ".join(reasoning),
            "priority": "high" if score >= 75 else "medium" if score >= 50 else "low",
        }
