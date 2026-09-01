# Backend Setup Script for Windows PowerShell

Write-Host "=== Portfolio Backend Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check Python installation
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found. Please install Python 3.8+ from https://python.org" -ForegroundColor Red
    exit 1
}

# Check PostgreSQL installation
Write-Host ""
Write-Host "Checking PostgreSQL..." -ForegroundColor Yellow
try {
    $psqlVersion = psql --version 2>&1
    Write-Host "✓ Found: $psqlVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠ PostgreSQL not found. You'll need to install it from https://www.postgresql.org/download/" -ForegroundColor Yellow
    Write-Host "  Or update DATABASE_URL in .env to use a different database." -ForegroundColor Yellow
}

# Create virtual environment
Write-Host ""
Write-Host "Creating virtual environment..." -ForegroundColor Yellow
if (Test-Path "venv") {
    Write-Host "✓ Virtual environment already exists" -ForegroundColor Green
} else {
    python -m venv venv
    Write-Host "✓ Virtual environment created" -ForegroundColor Green
}

# Activate virtual environment
Write-Host ""
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Create .env file if it doesn't exist
Write-Host ""
if (Test-Path ".env") {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
} else {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✓ .env file created from .env.example" -ForegroundColor Green
    Write-Host "⚠ Please update .env with your database credentials and secret key" -ForegroundColor Yellow
}

# Instructions
Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "1. Update the .env file with your database credentials" -ForegroundColor White
Write-Host "2. Create PostgreSQL database: createdb portfolio_db" -ForegroundColor White
Write-Host "3. Run the server: python main.py" -ForegroundColor White
Write-Host ""
Write-Host "The server will run at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "API Documentation: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Default admin credentials:" -ForegroundColor Yellow
Write-Host "  Email: admin@portfolio.com" -ForegroundColor White
Write-Host "  Password: admin123" -ForegroundColor White
Write-Host ""
