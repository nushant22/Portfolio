# Portfolio Website

Personal portfolio website with role-based authentication system.

## 🚀 Quick Start

### First Time Setup

```powershell
# 1. Setup backend
cd backend
.\setup.ps1

# 2. Setup frontend
cd ..\frontend
npm install

# 3. Start both servers
cd ..
.\start-dev.ps1
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Default Login

- **Email**: admin@portfolio.com
- **Password**: admin123

## 📚 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete installation guide
- **[AUTH_FEATURES.md](AUTH_FEATURES.md)** - Authentication system details
- **[backend/README.md](backend/README.md)** - Backend API documentation

## 🏗️ Project Structure

```
Portfolio/
├── backend/              # FastAPI backend
│   ├── routers/          # API endpoints
│   ├── auth.py           # JWT authentication
│   ├── models.py         # Database models
│   └── main.py           # FastAPI app
├── frontend/             # Next.js frontend
│   ├── app/              # Pages and routes
│   ├── components/       # React components
│   ├── contexts/         # Auth context
│   └── lib/              # API client
├── SETUP_GUIDE.md        # Setup instructions
└── AUTH_FEATURES.md      # Feature documentation
```

## 🛠️ Tech Stack

**Frontend**
- Next.js 15 with App Router
- React 19 with TypeScript
- Tailwind CSS
- Framer Motion

**Backend**
- FastAPI
- PostgreSQL + SQLAlchemy
- JWT authentication
- Pydantic validation

**Authentication**
- JWT tokens with bcrypt
- Role-based access control (RBAC)
- Three user roles: Admin, Editor, Viewer

## ✨ Features

### Authentication System
- ✅ User registration and login
- ✅ JWT token-based authentication
- ✅ Role-based access control
- ✅ Protected routes and API endpoints
- ✅ Password hashing with bcrypt

### User Roles
- **Admin**: Full system access, user management
- **Editor**: Content editing, view users
- **Viewer**: Read-only access

### User Interface
- ✅ Login/Register pages
- ✅ User dashboard
- ✅ Users management (Admin/Editor)
- ✅ Admin panel (Admin only)
- ✅ Responsive design
- ✅ Role badges and status indicators

### API Features
- ✅ RESTful API endpoints
- ✅ Auto-generated documentation
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling

## 🔒 Security

- Password hashing with bcrypt
- JWT tokens with expiration
- Role-based endpoint protection
- CORS protection
- SQL injection prevention (ORM)
- Input validation

## 📋 Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL 14+

## 🔧 Development

### Backend

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python main.py
```

### Frontend

```powershell
cd frontend
npm run dev
```

## 📝 API Endpoints

### Public
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Protected
- `GET /api/auth/me` - Get current user
- `GET /api/users/` - List users (Editor+)
- `PUT /api/users/{id}` - Update user (Admin)
- `DELETE /api/users/{id}` - Delete user (Admin)

Full API documentation: http://localhost:8000/docs

## 🎯 User Roles & Permissions

| Feature | Viewer | Editor | Admin |
|---------|--------|--------|-------|
| View Portfolio | ✓ | ✓ | ✓ |
| View Dashboard | ✓ | ✓ | ✓ |
| View Users | ✗ | ✓ | ✓ |
| Edit Content | ✗ | ✓ | ✓ |
| Manage Users | ✗ | ✗ | ✓ |
| Admin Panel | ✗ | ✗ | ✓ |

## 🐛 Troubleshooting

**Backend won't start**
- Check if PostgreSQL is running
- Verify DATABASE_URL in backend/.env
- Ensure database exists: `createdb portfolio_db`

**Frontend can't connect to API**
- Verify NEXT_PUBLIC_API_URL in frontend/.env.local
- Check if backend is running on port 8000
- Check for CORS errors in browser console

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed troubleshooting.

## 📄 License

Personal portfolio project.

---

**Status**: ✅ Fully Operational

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)
