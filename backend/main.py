from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import init_db, get_db
from models import User, UserRole
from auth import get_password_hash
from config import settings
from routers import auth, users


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize database and create admin user on startup"""
    # Initialize database tables
    init_db()
    
    # Create admin user if it doesn't exist
    db = next(get_db())
    try:
        admin_user = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if not admin_user:
            # Truncate password to 72 bytes for bcrypt compatibility
            admin_password = settings.ADMIN_PASSWORD[:72]
            admin_user = User(
                email=settings.ADMIN_EMAIL,
                username="admin",
                full_name="System Administrator",
                hashed_password=get_password_hash(admin_password),
                role=UserRole.ADMIN,
                is_active=True
            )
            db.add(admin_user)
            db.commit()
            print(f"✅ Admin user created: {settings.ADMIN_EMAIL}")
        else:
            print(f"ℹ️  Admin user already exists: {settings.ADMIN_EMAIL}")
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
        db.rollback()
    finally:
        db.close()
    
    yield
    
    # Cleanup (if needed)
    print("🛑 Application shutdown")


app = FastAPI(
    title="Portfolio API",
    description="Backend API for portfolio website with role-based authentication",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware - Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Portfolio API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
