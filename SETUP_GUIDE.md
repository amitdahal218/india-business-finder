# Complete Project Setup Guide

## Prerequisites

### Required Software
- Python 3.9+
- Node.js 18+
- PostgreSQL 12+
- Docker (optional, for containerized setup)

### Installation Links
- Python: https://www.python.org/downloads/
- Node.js: https://nodejs.org/
- PostgreSQL: https://www.postgresql.org/download/
- Docker: https://www.docker.com/products/docker-desktop

---

## Option 1: Quick Docker Setup (Recommended)

### Step 1: Install Docker
Download from https://www.docker.com/products/docker-desktop

### Step 2: Clone Repository
```bash
git clone https://github.com/amitdahal218/india-business-finder.git
cd india-business-finder
```

### Step 3: Setup Environment
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and add your API keys:
```
GOOGLE_MAPS_API_KEY=your_api_key
OPENAI_API_KEY=your_api_key
```

### Step 4: Run with Docker
```bash
docker-compose up -d
```

This starts:
- PostgreSQL (port 5432)
- Redis (port 6379)
- Backend API (port 8000)
- Celery Worker
- Celery Beat Scheduler

### Step 5: Access Application
```
API: http://localhost:8000
API Docs: http://localhost:8000/api/docs
Frontend: http://localhost:5173 (after running frontend)
```

---

## Option 2: Manual Setup

### Backend Setup

#### Step 1: Create Virtual Environment
```bash
cd backend
python -m venv venv

# Windows
venv\\Scripts\\activate

# Mac/Linux
source venv/bin/activate
```

#### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

#### Step 3: Setup Environment File
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
DATABASE_URL=postgresql://user:password@localhost/india_business_intelligence
REDIS_URL=redis://localhost:6379
GOOGLE_MAPS_API_KEY=your_api_key
OPENAI_API_KEY=your_api_key
```

#### Step 4: Create Database
```bash
# Make sure PostgreSQL is running
# Create database
psql -U postgres -c "CREATE DATABASE india_business_intelligence;"
```

#### Step 5: Run Backend
```bash
python run.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Frontend Setup

#### Step 1: Install Node Dependencies
```bash
cd frontend
npm install
```

#### Step 2: Run Frontend
```bash
npm run dev
```

You should see:
```
LOCAL:   http://localhost:5173/
```

---

## Testing the Application

### 1. Register a User
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "full_name": "Test User"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. List Businesses
```bash
curl http://localhost:8000/api/businesses/
```

### 4. View API Documentation
Open: http://localhost:8000/api/docs

---

## Database Schema

### Tables Created Automatically
1. **users** - User accounts
2. **businesses** - All discovered businesses
3. **leads** - Saved leads with AI scoring
4. **interactions** - Communication logs
5. **analytics** - Activity tracking
6. **ai_insights** - AI-generated insights
7. **notifications** - User alerts
8. **audit_logs** - System audit trail

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Businesses
- `GET /api/businesses/` - List all businesses
- `GET /api/businesses/{id}` - Get business details

### Leads
- `GET /api/leads/` - List user's leads
- `POST /api/leads/` - Create new lead
- `PUT /api/leads/{id}` - Update lead

### Search
- `GET /api/search/businesses` - Search with filters

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard stats

### AI Insights
- `GET /api/ai/business/{id}` - Get AI insights

### Admin
- `GET /api/admin/users` - List all users (admin only)

---

## Troubleshooting

### Port Already in Use
```bash
# Change port in backend/app/main.py or use:
uvicorn app.main:app --port 8001

# For frontend:
npm run dev -- --port 5174
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Check DATABASE_URL in .env
```

### Missing Dependencies
```bash
# Backend
pip install --upgrade pip
pip install -r requirements.txt

# Frontend
npm cache clean --force
rm -rf node_modules
npm install
```

### Redis Connection Error
```bash
# Start Redis
redis-server

# Or with Docker
docker run -d -p 6379:6379 redis
```

---

## Environment Variables Explained

```
# Database
DATABASE_URL          # PostgreSQL connection string

# Cache
REDIS_URL             # Redis connection string

# API Keys
GOOGLE_MAPS_API_KEY   # Get from Google Cloud Console
OPENAI_API_KEY        # Get from OpenAI Platform

# Security
SECRET_KEY            # Change to random string in production
JWT_SECRET_KEY        # Change to random string in production

# Email
SMTP_HOST             # Gmail, SendGrid, etc.
SMTP_USER             # Your email
SMTP_PASSWORD         # App password

# Application
ENVIRONMENT           # development or production
DEBUG                 # True or False
LOG_LEVEL             # INFO, DEBUG, WARNING, ERROR
```

---

## Next Steps

1. ✅ Complete the setup above
2. ✅ Test API at http://localhost:8000/api/docs
3. ✅ Register a test user
4. ✅ Explore the dashboard
5. ✅ Add your API keys (Google Maps, OpenAI)
6. ✅ Start discovering businesses
7. ✅ Deploy to production

---

## Production Deployment

See `docs/DEPLOYMENT_GUIDE.md` for:
- AWS deployment
- GCP deployment
- Docker deployment
- SSL/TLS setup
- Load balancing
- Monitoring & logging

---

## Support

For issues or questions:
1. Check error logs
2. Review API documentation
3. Create a GitHub issue
4. Contact support team

---

Happy coding! 🚀
