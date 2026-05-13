"""Message Generator - AI-Powered Outreach Message Generation"""

class MessageGenerator:
    """Generate personalized outreach messages"""
    
    @staticmethod
    def generate_email(business_name: str, category: str, service: str) -> str:
        """
        Generate professional outreach email
        """
        email_template = f"""Subject: Premium {service.title()} Services for {business_name}

Dear {business_name} Team,

We are reaching out to offer specialized {service} services tailored for {category.lower()}s like yours.

Our Services:
- Professional {service} with native speakers
- Quick turnaround times
- Competitive pricing
- Quality assurance

We've successfully helped 500+ institutions across India with their {service} needs.

Would you be interested in a brief consultation call to discuss how we can support your organization?

Best regards,
Business Development Team
India Business Intelligence Platform

Contact: +91-XXXXXXXXXX
Email: contact@businessintel.com
Website: www.businessintel.com"""
        return email_template
    
    @staticmethod
    def generate_whatsapp(business_name: str, service: str) -> str:
        """
        Generate WhatsApp message
        """
        message = f"""Hi {business_name} Team! 👋

We offer premium {service} services for businesses like yours.

✅ 500+ satisfied clients
✅ Quick turnaround
✅ Competitive rates
✅ Quality guaranteed

Interested in discussing? Book a free consultation: [Link]

Drop us a message or call us!
📞 +91-XXXXXXXXXX"""
        return message
    
    @staticmethod
    def generate_linkedin(business_name: str, service: str) -> str:
        """
        Generate LinkedIn message
        """
        message = f"""Hi there,

I noticed {business_name} is expanding its services. We specialize in {service} solutions that have helped 500+ organizations enhance their reach and impact.

Our team has successfully delivered projects for leading institutions in India. Would love to explore how we can support your growth.

Free consultation call? Let me know!

Best,
Business Development Team
India Business Intelligence"""
        return message
