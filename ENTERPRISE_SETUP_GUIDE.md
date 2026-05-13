# Enterprise Setup Guide - India Business Intelligence Platform

## Complete Step-by-Step Implementation

### Prerequisites Checklist

- [ ] Python 3.9+
- [ ] Node.js 18+
- [ ] PostgreSQL 13+
- [ ] Redis 6+
- [ ] Docker & Docker Compose (optional but recommended)
- [ ] Google Maps API Key
- [ ] OpenAI/Claude API Key (for AI features)
- [ ] Git installed

---

## Part 1: Environment Setup

### 1.1 Install System Dependencies

**Windows (using Chocolatey):**
```bash
choco install python nodejs postgresql redis-64 docker-desktop
```

**Mac (using Homebrew):**
```bash
brew install python node postgresql redis docker
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install python3.9 nodejs postgresql postgresql-contrib redis-server docker.io
```

### 1.2 Verify Installations

```bash
python --version           # Should be 3.9+
node --version             # Should be 18+
npm --version              # Should be 9+
psql --version             # Should be 13+
redis-cli --version        # Should be 6+
docker --version           # Should be latest
```

---

## Part 2: Backend Setup (FastAPI + PostgreSQL)

### 2.1 Create and Activate Virtual Environment

**Windows:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 2.2 Install Python Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 2.3 Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/business_finder
DATABASE_TEST_URL=sqlite:///./test.db

# Redis
REDIS_URL=redis://localhost:6379

# JWT Secret (Generate: python -c "import secrets; print(secrets.token_urlsafe(32))")
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# API Keys
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
OPENAI_API_KEY=your-openai-api-key
SENDGRID_API_KEY=your-sendgrid-api-key

# App Settings
DEBUG=False
APP_NAME=India Business Finder
APP_VERSION=2.0.0
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]

# Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-me-in-production

# Celery
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/1
```

### 2.4 Setup PostgreSQL Database

**Windows/Mac (using GUI):**
1. Open pgAdmin
2. Create new database: `business_finder`
3. Note username and password

**Linux:**
```bash
sudo -u postgres psql
CREATE DATABASE business_finder;
CREATE USER business_user WITH PASSWORD 'secure_password';
ALTER ROLE business_user SET client_encoding TO 'utf8';
ALTER ROLE business_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE business_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE business_finder TO business_user;
\q
```

### 2.5 Initialize Database

```bash
python database/init_db.py
```

You should see:
```
✓ Database tables created successfully!
✓ Sample data loaded
✓ Ready to start backend
```

### 2.6 Start Redis Server

**Windows:**
```bash
redis-server
```

**Mac:**
```bash
brew services start redis
```

**Linux:**
```bash
sudo systemctl start redis-server
```

### 2.7 Start Backend Server

```bash
python run.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

✅ **Backend is running!** Access at: http://localhost:8000

---

## Part 3: Frontend Setup (React + Vite)

### 3.1 Install Dependencies

```bash
cd frontend
npm install
```

### 3.2 Create Environment File

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_MAPS_KEY=your-google-maps-api-key
VITE_APP_NAME=India Business Finder
```

### 3.3 Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ **Frontend is running!** Access at: http://localhost:5173

---

## Part 4: Celery Worker Setup (Optional but Recommended)

For background tasks (email, AI scoring, discovery):

### 4.1 Start Celery Worker (New Terminal)

```bash
cd backend
source venv/bin/activate  # or: venv\Scripts\activate on Windows
python celery_worker.py
```

### 4.2 Start Celery Beat (Scheduler) - Another Terminal

```bash
cd backend
source venv/bin/activate
python -m celery -A app.tasks beat --loglevel=info
```

---

## Part 5: Access the Application

Now you have running:

1. **Frontend** (React Dashboard)
   - URL: http://localhost:5173
   - Features: Search, lead management, analytics

2. **Backend** (FastAPI)
   - URL: http://localhost:8000
   - API Docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

3. **PostgreSQL** (Database)
   - Host: localhost:5432
   - Database: business_finder
   - User: business_user

4. **Redis** (Cache & Task Queue)
   - Host: localhost:6379
   - Used for caching and Celery

---

## Part 6: Get API Keys

### 6.1 Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create API key
5. Add to `.env` as `GOOGLE_MAPS_API_KEY`

### 6.2 OpenAI API Key

1. Go to [OpenAI](https://platform.openai.com/api-keys)
2. Create new API key
3. Add to `.env` as `OPENAI_API_KEY`

### 6.3 SendGrid API Key (for emails)

1. Go to [SendGrid](https://sendgrid.com/)
2. Create account
3. Generate API key
4. Add to `.env` as `SENDGRID_API_KEY`

---

## Part 7: Test the Platform

### 7.1 Test Backend API

Go to: http://localhost:8000/docs

Try these endpoints:

1. **Register**
   ```
   POST /api/v1/auth/register
   {
     "email": "test@example.com",
     "password": "testpass123",
     "name": "Test User"
   }
   ```

2. **Login**
   ```
   POST /api/v1/auth/login
   {
     "email": "test@example.com",
     "password": "testpass123"
   }
   ```

3. **Search Businesses**
   ```
   GET /api/v1/search?city=Mumbai&category=Coaching%20Centre
   ```

4. **Create Lead**
   ```
   POST /api/v1/leads
   {
     "business_id": 1,
     "notes": "Promising lead"
   }
   ```

### 7.2 Test Frontend

1. Open http://localhost:5173
2. Register an account
3. Login
4. Search for businesses
5. Create leads
6. View dashboard

---

## Part 8: Using Docker (Optional)

### 8.1 Build and Run with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down
```

### 8.2 Individual Services

```bash
# Build
docker build -t business-finder .

# Run
docker run -p 8000:8000 business-finder
```

---

## Troubleshooting

### "Port 8000 already in use"
```bash
# Find process using port 8000
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows

# Kill process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### "PostgreSQL connection refused"
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # Mac

# Start PostgreSQL
sudo systemctl start postgresql  # Linux
brew services start postgresql  # Mac
```

### "Redis connection error"
```bash
# Check if Redis is running
redis-cli ping

# Should return: PONG
```

### "ModuleNotFoundError"
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate  # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### "CORS Error"
```
# Make sure frontend URL is in CORS_ORIGINS
# In .env, check:
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
```

---

## Development Workflow

### Terminal Layout (Recommended)

```
┌─────────────────┬──────────────────┬──────────────────┐
│  Backend        │  Frontend        │  Celery Worker   │
│  (Port 8000)    │  (Port 5173)     │  (Background)    │
│                 │                  │                  │
│  python run.py  │  npm run dev     │  celery worker   │
│                 │                  │                  │
└─────────────────┴──────────────────┴──────────────────┘
```

### Common Commands

```bash
# Backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
python run.py

# Frontend
cd frontend
npm install
npm run dev

# Database
python database/init_db.py

# Run tests
pytest  # Backend tests
npm test  # Frontend tests

# Build for production
npm run build  # Frontend
```

---

## Next Steps

1. ✅ Complete all setup steps above
2. ✅ Test API endpoints at http://localhost:8000/docs
3. ✅ Register and login on http://localhost:5173
4. ✅ Search for businesses
5. ✅ Create and manage leads
6. ✅ Test AI features
7. ✅ View analytics dashboard

---

## Production Deployment

See **DEPLOYMENT_GUIDE.md** for:
- Docker production setup
- Kubernetes deployment
- AWS/GCP/Azure setup
- Database backups
- SSL certificates
- Domain configuration
- Monitoring & logging

---

**Ready to build the future of business intelligence! 🚀**
