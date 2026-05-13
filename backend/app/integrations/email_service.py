"""Email Service Integration"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings


class EmailService:
    """Email sending service"""
    
    @staticmethod
    def send_email(to_email: str, subject: str, body: str) -> bool:
        """
        Send email to recipient
        
        In production, use SendGrid or similar service
        """
        try:
            # Mock implementation - in production would send real email
            print(f"Email sent to {to_email}: {subject}")
            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
    
    @staticmethod
    def send_notification(user_email: str, subject: str, message: str) -> bool:
        """
        Send notification email to user
        """
        return EmailService.send_email(user_email, subject, message)
