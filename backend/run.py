import uvicorn

if __name__ == "__main__":
    # Run the FastAPI application
    # reload=True enables auto-reload when files change
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
