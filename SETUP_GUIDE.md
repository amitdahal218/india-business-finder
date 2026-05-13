# Complete Setup Guide - India Business Finder 🇮🇳

## Step 1: Prerequisites

Before you start, make sure you have installed:

### Windows, Mac, or Linux?

**For Python (All Platforms):**
- Download from: https://www.python.org/downloads/
- Version: 3.9 or higher
- During installation, CHECK "Add Python to PATH"

**For Node.js (All Platforms):**
- Download from: https://nodejs.org/
- Version: 18 LTS or higher
- This includes npm (Node Package Manager)

### Verify Installation

Open Terminal/Command Prompt and run:
```bash
python --version
node --version
npm --version
git --version
```

You should see version numbers for all.

---

## Step 2: Clone Repository

```bash
# Navigate to where you want the project
cd Desktop  # or any folder

# Clone the repository
git clone https://github.com/amitdahal218/india-business-finder.git

# Enter the project folder
cd india-business-finder
```

---

## Step 3: Backend Setup (Python + FastAPI)

### 3.1 Create Virtual Environment

A virtual environment is a separate Python workspace for this project.

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

You should see `(venv)` at the start of your terminal line.

### 3.2 Install Python Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- **FastAPI** - Backend web framework
- **SQLAlchemy** - Database ORM
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
- **Python-dotenv** - Environment variables

### 3.3 Setup Environment Variables

```bash
# Create .env file from template
cp .env.example .env
```

Edit `.env` file:
```
DATABASE_URL=sqlite:///./business_finder.db
GOOGLE_MAPS_API_KEY=your_api_key_here_later
DEBUG=True
```

### 3.4 Initialize Database

```bash
# Go back to project root
cd ..

# Initialize the database
python database/init_db.py
```

You should see: `Database initialized successfully!`

### 3.5 Run Backend Server

```bash
cd backend
python run.py
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

✅ **Backend is running!** Keep this terminal open.

---

## Step 4: Frontend Setup (React + Vite)

### 4.1 Open New Terminal

Don't close the backend terminal. Open a **new terminal window** and navigate to the project:

```bash
cd india-business-finder
cd frontend
```

### 4.2 Install Dependencies

```bash
npm install
```

This installs:
- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Styling framework

### 4.3 Run Development Server

```bash
npm run dev
```

You should see:
```
  VITE v4.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

✅ **Frontend is running!** Keep this terminal open too.

---

## Step 5: Access the Application

Now you have 3 terminals open:

1. **Backend** - http://localhost:8000
2. **Frontend** - http://localhost:5173
3. **API Docs** - http://localhost:8000/docs

### Open in Your Browser:

**Frontend Dashboard:**
```
http://localhost:5173
```

**API Documentation (Interactive):**
```
http://localhost:8000/docs
```

You can test API endpoints here!

---

## Step 6: Test the MVP

### 6.1 Add a Business (Using API Docs)

1. Go to http://localhost:8000/docs
2. Click on **POST /api/businesses**
3. Click **"Try it out"**
4. Enter this JSON in the request body:
```json
{
  "name": "ABC Coaching Centre",
  "category": "Coaching Centre",
  "city": "Mumbai",
  "state": "Maharashtra",
  "address": "123 Main Street",
  "phone": "+919876543210",
  "email": "info@abccoaching.com",
  "website": "https://abccoaching.com"
}
```
5. Click **Execute**

You should see a response with ID and timestamp.

### 6.2 Search Businesses (Using API Docs)

1. Go to http://localhost:8000/docs
2. Click on **GET /api/businesses/search**
3. Click **"Try it out"**
4. Type in the search box:
   - `category=Coaching Centre` OR
   - `city=Mumbai` OR
   - `name=ABC`
5. Click **Execute**

You should see results matching your search!

### 6.3 Test Frontend Dashboard

1. Go to http://localhost:5173
2. You'll see the business dashboard
3. Try the search functionality
4. Add a business using the form

---

## Step 7: Stop the Application

When you're done:

**Backend Terminal:**
```
Press Ctrl + C
```

**Frontend Terminal:**
```
Press Ctrl + C
```

---

## Troubleshooting

### ❌ "ModuleNotFoundError: No module named 'fastapi'"
**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### ❌ "Port 8000 is already in use"
**Solution:** Change the port in backend/run.py:
```python
uvicorn.run(app, host="0.0.0.0", port=8001)  # Changed to 8001
```

### ❌ "Port 5173 is already in use"
**Solution:** Change the port in vite.config.js:
```javascript
server: {
  port: 5174  // Changed to 5174
}
```

### ❌ "npm command not found"
**Solution:** Install Node.js from https://nodejs.org/

### ❌ Database errors
**Solution:** Delete the database and reinitialize:
```bash
rm backend/business_finder.db
python database/init_db.py
```

---

## Terminal Setup Tips

**Best Practice:** Use this layout

```
┌─────────────────────┬─────────────────────┐
│   Backend Terminal  │  Frontend Terminal  │
│   (Port 8000)       │  (Port 5173)        │
│                     │                     │
│   Running...        │  Ready in xxx ms    │
└─────────────────────┴─────────────────────┘
```

**For Windows:** Use VSCode built-in terminal (split view)
**For Mac/Linux:** Use iTerm2 or split terminal

---

## Next Steps

✅ Complete all setup steps above

✅ Test API endpoints at http://localhost:8000/docs

✅ Add a business entry through the dashboard

✅ Search for businesses

✅ Explore the code structure

✅ Start customizing for your needs

---

## Key Commands Reference

```bash
# Activate virtual environment (Windows)
venv\Scripts\activate

# Activate virtual environment (Mac/Linux)
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run backend
cd backend
python run.py

# Run frontend (new terminal)
cd frontend
npm run dev

# Stop server
Ctrl + C

# Deactivate virtual environment
deactivate
```

---

## Need Help?

1. Check the error message carefully
2. Google the error message
3. Check Python/Node.js versions
4. Delete dependencies and reinstall
5. Create a GitHub issue on the repository

Happy coding! 🚀
