# India Business Intelligence Platform

> Enterprise AI-powered lead generation and business discovery system for India

## 🚀 Features

### Core Capabilities
- 🔍 **Business Discovery** - Automatic discovery from Google Maps API across all India
- 🤖 **AI Intelligence** - Lead scoring, business analysis, smart recommendations
- 📊 **Analytics Dashboard** - Real-time KPIs and insights
- 🔄 **Automation** - Background jobs, scheduled reports, bulk operations
- 🏢 **Enterprise Ready** - Multi-user, RBAC, audit logs, encrypted data

### Search & Discovery
- Search by city, district, state, pincode
- Auto-duplicate detection
- Real-time location mapping
- Batch processing

### AI Features
- Lead scoring (0-100)
- Business summarization
- Service prediction
- Outreach automation
- NLP analysis

### Lead Management
- CRM-style pipeline
- Interaction tracking
- Follow-up scheduling
- Export capabilities

## 🏗️ Architecture

```
Frontend (React + Vite)
    ↓
Backend API (FastAPI)
    ↓
Database (PostgreSQL)
Cache (Redis)
Job Queue (Celery)
AI Services (OpenAI)
External APIs (Google Maps)
```

## 📋 Tech Stack

### Backend
- **FastAPI** - Modern async web framework
- **PostgreSQL** - Production database
- **Redis** - Caching & session management
- **Celery** - Background job processing
- **SQLAlchemy** - ORM
- **JWT** - Authentication

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### AI & Integrations
- **OpenAI/Claude** - AI services
- **Google Maps API** - Business discovery
- **Email Service** - Notifications

## 🚀 Quick Start

### With Docker (Recommended)
```bash
git clone https://github.com/amitdahal218/india-business-finder.git
cd india-business-finder

cp backend/.env.example backend/.env
# Edit .env with your API keys

docker-compose up -d
```

### Manual Setup
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python run.py

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Access
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/api/docs
- **Frontend**: http://localhost:5173

## 📚 Documentation

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup instructions
- [docs/API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) - API reference
- [docs/DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md) - Production deployment

## 🗄️ Database Schema

8 main tables:
1. **users** - User accounts with roles
2. **businesses** - All discovered businesses
3. **leads** - Managed leads with AI scoring
4. **interactions** - Communication logs
5. **analytics** - Activity tracking
6. **ai_insights** - AI-generated analysis
7. **notifications** - User alerts
8. **audit_logs** - System audit trail

## 🔐 Security

✅ JWT authentication
✅ Password hashing (bcrypt)
✅ CORS protection
✅ Rate limiting
✅ SQL injection prevention
✅ XSS protection
✅ Audit logging
✅ Role-based access control

## 📊 Key Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Businesses
- `GET /api/businesses/` - List businesses
- `GET /api/businesses/{id}` - Get details

### Leads
- `GET /api/leads/` - List leads
- `POST /api/leads/` - Create lead
- `PUT /api/leads/{id}` - Update lead

### Search
- `GET /api/search/businesses` - Advanced search

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats

### AI
- `GET /api/ai/business/{id}` - AI insights

## 🤖 AI Features

### Lead Scoring
Automatically scores leads 0-100 based on:
- Business category
- Rating & reviews
- Online presence
- Social media activity

### Message Generation
AI-generates personalized:
- Email outreach
- WhatsApp messages
- LinkedIn messages

### Business Analysis
- Extract keywords
- Identify services
- Predict needs
- Generate summaries

## 📈 Sample Data

Includes sample data for:
- Coaching centres
- Publishers
- Schools & colleges
- Language institutes
- Printing presses

## 🛠️ Development

### Project Structure
```
india-business-finder/
├── backend/
│   ├── app/
│   │   ├── core/          # Config, security, dependencies
│   │   ├── models/        # Database models
│   │   ├── routes/        # API endpoints
│   │   ├── ai/            # AI services
│   │   ├── integrations/  # External APIs
│   │   └── tasks/         # Celery tasks
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── components/    # React components
│   │   └── services/      # API client
│   └── package.json
└── docs/                   # Documentation
```

### Running Tests
```bash
cd backend
pytest
```

## 🚀 Deployment

### Docker
```bash
docker-compose up -d
```

### AWS/GCP
See [DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md)

## 📝 Environment Setup

```bash
cp backend/.env.example backend/.env
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `GOOGLE_MAPS_API_KEY` - Google Maps API key
- `OPENAI_API_KEY` - OpenAI API key
- `SECRET_KEY` - Random secret key
- `JWT_SECRET_KEY` - Random JWT secret

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create a Pull Request

## 📄 License

MIT License - See LICENSE file

## 📞 Support

For issues or questions:
- Create a GitHub issue
- Check documentation
- Review API docs at http://localhost:8000/api/docs

---

**Built with ❤️ for Indian businesses** 🇮🇳
