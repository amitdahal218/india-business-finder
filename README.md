# India Business Finder 🇮🇳

An AI-powered business research software to find and manage leads across India for translation, publishing, and educational services.

## Project Overview

This project helps you:
- 🔍 Search for coaching centres, publishers, authors, and educational organizations across India
- 📍 Get accurate location data with Google Maps integration
- 📋 Save and manage leads in a database
- 🤖 Use AI to score and prioritize leads
- 📊 Export data to Excel/CSV
- 📱 Access via mobile-friendly dashboard

## Tech Stack

- **Backend**: Python + FastAPI
- **Frontend**: React + Vite + Tailwind CSS
- **Database**: SQLite (development) / PostgreSQL (production)
- **APIs**: Google Maps API

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/amitdahal218/india-business-finder.git
cd india-business-finder
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python run.py
```

### 3. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

### 4. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Project Structure

```
india-business-finder/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI app entry point
│   │   ├── models.py       # Database models
│   │   ├── database.py     # Database configuration
│   │   ├── schemas.py      # Data validation schemas
│   │   └── routes/
│   │       └── businesses.py # Business search routes
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example        # Environment variables template
│   └── run.py              # Run the server
├── frontend/                # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # React entry point
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS files
│   │   └── api.js          # API integration
│   ├── package.json        # JavaScript dependencies
│   ├── vite.config.js      # Vite configuration
│   └── index.html          # HTML entry point
├── database/
│   ├── schema.sql          # Database schema
│   └── init_db.py          # Database initialization
├── SETUP_GUIDE.md          # Step-by-step setup
└── README.md               # This file
```

## Features

### MVP (Phase 1) ✅
- Basic business search (coaching centres, publishers, authors)
- Manual data entry
- Search by name and category
- SQLite database
- Simple dashboard

### Phase 2
- Google Maps API integration
- Advanced search filters
- Lead export to CSV

### Phase 3
- AI lead scoring
- Email/WhatsApp message generation
- Dark mode UI
- Mobile responsive design

## Documentation

- **[Setup Guide](./SETUP_GUIDE.md)** - Detailed step-by-step setup instructions
- **[API Documentation](http://localhost:8000/docs)** - Interactive API docs (after running backend)

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License
