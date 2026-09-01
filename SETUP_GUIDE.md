# Role-Based Authentication Setup Guide

This guide will help you set up the complete role-based authentication system for your portfolio website.

## Overview

The authentication system includes:
- **Backend**: FastAPI with JWT authentication and PostgreSQL
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Roles**: Admin, Editor, and Viewer with different permission levels

## Prerequisites

### Required Software

1. **Python 3.8+** - [Download](https://www.python.org/downloads/)
2. **Node.js 18+** - [Download](https://nodejs.org/)
3. **PostgreSQL 14+** - [Download](https://www.postgresql.org/download/)

### Verify Installations

```powershell
python --version
node --version
psql --version
```

## Backend Setup

### Step 1: Navigate to Backend Directory

```powershell
cd backend
```

### Step 2: Run Setup Script (Recommended)

```powershell
.\setup.ps1
```

This script will:
- Create a virtual environment
- Install all dependencies
- Create a `.env` file from the example

### Step 3: Configure Environment Variables

Edit the `.env` file and update the following:

```env
# Database - Update with your PostgreSQL credentials
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/portfolio_db

# JWT - Generate a secure secret key
SECRET_KEY=your-secure-random-secret-key-change-this

# Admin credentials (will be created on first run)
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
```

**To generate a secure secret key:**

```powershell
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Step 4: Create Database

```powershell
# Using PostgreSQL command line
createdb portfolio_db

# Or connect to PostgreSQL and run:
# CREATE DATABASE portfolio_db;
```

### Step 5: Start Backend Server

```powershell
# Activate virtual environment (if not already active)
.\venv\Scripts\Activate.ps1

# Run the server
python main.py
```

The backend will:
- Start at `http://localhost:8000`
- Create database tables automatically
- Create the admin user on first run
- Provide API documentation at `http://localhost:8000/docs`

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```powershell
cd ..\frontend
```

### Step 2: Install Dependencies

```powershell
npm install
```

### Step 3: Configure Environment

The `.env.local` file has been created with:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Step 4: Start Development Server

```powershell
npm run dev
```

The frontend will start at `http://localhost:3000`

## Testing the System

### 1. Access the Application

Open your browser and navigate to `http://localhost:3000`

### 2. Login with Admin Account

1. Click "Login" in the navigation bar
2. Use the default credentials:
   - **Email**: `admin@portfolio.com`
   - **Password**: `admin123`

### 3. Explore Features

After logging in, you'll have access to:

#### Admin Role (Full Access)
- ✓ View Dashboard
- ✓ Manage Users (view, edit, delete, activate/deactivate)
- ✓ Access Admin Panel
- ✓ View all content

#### Editor Role
- ✓ View Dashboard
- ✓ View user list
- ✓ Edit content
- ✗ Cannot manage users or access admin panel

#### Viewer Role
- ✓ View Dashboard
- ✓ View content
- ✗ Cannot edit or manage anything

## User Management

### Creating New Users

1. Go to `http://localhost:3000/register`
2. Fill in the registration form
3. New users are created with "Viewer" role by default
4. Admins can change roles in the Users Management page

### Changing User Roles (Admin Only)

1. Login as admin
2. Go to Dashboard → Manage Users
3. Click on a user to view details
4. Update role using the admin panel

## API Endpoints

The backend provides these main endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### User Management (Protected)
- `GET /api/users/` - List all users (Editor+)
- `GET /api/users/{id}` - Get user details (Editor+)
- `PUT /api/users/{id}` - Update user (Admin only)
- `DELETE /api/users/{id}` - Delete user (Admin only)
- `POST /api/users/{id}/activate` - Activate user (Admin only)
- `POST /api/users/{id}/deactivate` - Deactivate user (Admin only)

## Project Structure

```
Portfolio/
├── backend/
│   ├── routers/
│   │   ├── auth.py          # Authentication endpoints
│   │   └── users.py         # User management endpoints
│   ├── auth.py              # JWT and role checking logic
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
│
└── frontend/
    ├── app/
    │   ├── login/           # Login page
    │   ├── register/        # Registration page
    │   ├── dashboard/       # Protected dashboard
    │   │   ├── users/       # User management (Editor+)
    │   │   └── admin/       # Admin panel (Admin only)
    │   └── layout.tsx       # Root layout with AuthProvider
    ├── components/
    │   └── nav/
    │       └── Navbar.tsx   # Navigation with auth UI
    ├── contexts/
    │   └── AuthContext.tsx  # Authentication state
    ├── hooks/
    │   └── useRequireAuth.ts # Route protection hook
    └── lib/
        └── api.ts           # API client
```

## Security Features

✅ **Password Hashing**: Uses bcrypt for secure password storage  
✅ **JWT Tokens**: Stateless authentication with expiration  
✅ **Role-Based Access Control**: Three-tier permission system  
✅ **Protected Routes**: Automatic redirect for unauthorized access  
✅ **Token Validation**: Server-side validation on every request  
✅ **CORS Protection**: Configured for frontend domain only  

## Troubleshooting

### Backend Issues

**Database Connection Error**
```
Check DATABASE_URL in .env file
Ensure PostgreSQL is running: Get-Service postgresql*
Verify database exists: psql -l
```

**Module Not Found**
```powershell
# Reinstall dependencies
pip install -r requirements.txt
```

**Port Already in Use**
```powershell
# Change port in main.py or kill the process using port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Frontend Issues

**API Connection Error**
```
Verify NEXT_PUBLIC_API_URL in .env.local
Ensure backend is running at http://localhost:8000
Check browser console for CORS errors
```

**Module Not Found**
```powershell
# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

**Build Errors**
```powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run dev
```

## Production Deployment

### Backend

1. **Update Environment Variables**
   - Generate a strong SECRET_KEY
   - Use production database URL
   - Change admin credentials

2. **Use Production Server**
   ```powershell
   pip install gunicorn
   gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
   ```

3. **Enable HTTPS**
   - Use a reverse proxy (nginx, Caddy)
   - Obtain SSL certificate (Let's Encrypt)

### Frontend

1. **Update API URL**
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-domain.com
   ```

2. **Build for Production**
   ```powershell
   npm run build
   npm start
   ```

3. **Deploy** to Vercel, Netlify, or your hosting provider

## Support

For issues or questions:
- Check API documentation: `http://localhost:8000/docs`
- Review error logs in terminal
- Check browser console for frontend errors

## Next Steps

- [ ] Customize user roles and permissions
- [ ] Add password reset functionality
- [ ] Implement email verification
- [ ] Add OAuth providers (Google, GitHub)
- [ ] Set up automated backups
- [ ] Configure monitoring and logging

---

**Congratulations!** Your role-based authentication system is now set up and ready to use. 🎉
