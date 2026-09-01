# Portfolio Backend

FastAPI backend with JWT authentication and role-based access control.

## Features

- 🔐 JWT-based authentication
- 👥 Role-based access control (Admin, Editor, Viewer)
- 🗄️ PostgreSQL database with SQLAlchemy ORM
- 📝 Auto-generated API documentation
- 🔒 Password hashing with bcrypt
- ✅ Input validation with Pydantic

## Quick Start

### Setup

```powershell
# Run the setup script
.\setup.ps1

# Or manually:
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Configuration

1. Copy `.env.example` to `.env`
2. Update database credentials and secret key

### Run Server

```powershell
# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Start server
python main.py
```

Server runs at: `http://localhost:8000`  
API Docs: `http://localhost:8000/docs`

## Default Admin

- **Email**: admin@portfolio.com
- **Password**: admin123

**⚠️ Change these credentials in production!**

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/auth/me` - Get current user

### Users (Protected)
- `GET /api/users/` - List users (Editor+)
- `GET /api/users/{id}` - Get user (Editor+)
- `PUT /api/users/{id}` - Update user (Admin)
- `DELETE /api/users/{id}` - Delete user (Admin)
- `POST /api/users/{id}/activate` - Activate (Admin)
- `POST /api/users/{id}/deactivate` - Deactivate (Admin)

## Roles & Permissions

| Role   | View Users | Edit Content | Manage Users | Admin Panel |
|--------|-----------|--------------|--------------|-------------|
| Viewer | ✗         | ✗            | ✗            | ✗           |
| Editor | ✓         | ✓            | ✗            | ✗           |
| Admin  | ✓         | ✓            | ✓            | ✓           |

## Project Structure

```
backend/
├── routers/
│   ├── auth.py      # Authentication endpoints
│   └── users.py     # User management
├── auth.py          # JWT & role checking
├── config.py        # Settings
├── database.py      # DB connection
├── models.py        # SQLAlchemy models
├── schemas.py       # Pydantic schemas
└── main.py          # FastAPI app
```

## Development

```powershell
# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
python main.py

# Access API docs
# http://localhost:8000/docs
```

## Database

### Create Database

```powershell
createdb portfolio_db
```

### Migrations

Tables are created automatically on startup. For production, consider using Alembic for migrations.

## Security

- Passwords hashed with bcrypt
- JWT tokens with expiration
- Role-based endpoint protection
- CORS configured for frontend only
- SQL injection protection via ORM

## Troubleshooting

**Port in use:**
```powershell
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Database connection error:**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists

See [SETUP_GUIDE.md](../SETUP_GUIDE.md) for detailed instructions.
