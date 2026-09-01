from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from models import UserRole


# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None


# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=6)
    role: Optional[UserRole] = UserRole.VIEWER


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None


class UserInDB(UserBase):
    id: int
    role: UserRole
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserResponse(UserInDB):
    pass


# Login schema
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# Message schema
class Message(BaseModel):
    message: str
