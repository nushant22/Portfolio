# Authentication System Features

## Overview

This portfolio website now includes a complete role-based authentication system with three user roles and comprehensive access control.

## User Roles

### 1. Viewer (Default)
- **Access Level**: Read-only
- **Permissions**:
  - View portfolio content
  - Access personal dashboard
  - View own profile information
- **Restrictions**:
  - Cannot view other users
  - Cannot edit any content
  - No administrative access

### 2. Editor
- **Access Level**: Content management
- **Permissions**:
  - All Viewer permissions
  - View list of all users
  - Edit portfolio content
  - Manage blog posts/projects
- **Restrictions**:
  - Cannot change user roles
  - Cannot delete users
  - No admin panel access

### 3. Admin
- **Access Level**: Full control
- **Permissions**:
  - All Editor permissions
  - Full user management (create, update, delete)
  - Change user roles
  - Activate/deactivate accounts
  - Access admin panel
  - System configuration
- **Restrictions**: None

## Features Implemented

### Backend (FastAPI)

#### Authentication
- ✅ JWT token-based authentication
- ✅ Secure password hashing (bcrypt)
- ✅ Token expiration (30 minutes default)
- ✅ Login/logout functionality
- ✅ User registration
- ✅ Current user endpoint

#### Authorization
- ✅ Role-based access control (RBAC)
- ✅ Protected endpoints with role checking
- ✅ Middleware for authentication
- ✅ Three-tier permission system

#### User Management
- ✅ Create new users
- ✅ Update user information
- ✅ Delete users
- ✅ Activate/deactivate accounts
- ✅ List all users (Editor+)
- ✅ View user details (Editor+)
- ✅ Change user roles (Admin only)

#### Security
- ✅ Password strength validation
- ✅ Duplicate email/username prevention
- ✅ Self-action prevention (can't delete/deactivate own account)
- ✅ CORS configuration
- ✅ SQL injection protection (ORM)
- ✅ Auto-generated API documentation

#### Database
- ✅ PostgreSQL integration
- ✅ SQLAlchemy ORM
- ✅ User model with roles
- ✅ Automatic table creation
- ✅ Admin user auto-creation on startup

### Frontend (Next.js)

#### Authentication UI
- ✅ Login page with validation
- ✅ Registration page with validation
- ✅ Unauthorized access page
- ✅ Loading states
- ✅ Error handling
- ✅ Success feedback

#### Protected Routes
- ✅ Dashboard (requires login)
- ✅ Users management page (Editor+)
- ✅ Admin panel (Admin only)
- ✅ Automatic redirects for unauthorized access

#### User Experience
- ✅ Persistent login (localStorage)
- ✅ Navbar shows login/logout
- ✅ User info display in navbar
- ✅ Role badges
- ✅ Role-based quick actions
- ✅ Mobile-responsive design

#### State Management
- ✅ Global authentication context
- ✅ React hooks (useAuth, useRequireAuth)
- ✅ Automatic token management
- ✅ User session persistence

#### User Dashboard
- ✅ Welcome section with user info
- ✅ Account details display
- ✅ Quick action cards
- ✅ Permission summary
- ✅ Role-based navigation

#### User Management Interface
- ✅ User list table
- ✅ Role badges
- ✅ Status indicators
- ✅ Activate/deactivate buttons (Admin)
- ✅ Delete user button (Admin)
- ✅ Self-protection (can't modify own account)

## API Endpoints

### Public Endpoints
```
POST /api/auth/login          - User login
POST /api/auth/register       - New user registration
GET  /                        - API root
GET  /api/health             - Health check
```

### Protected Endpoints (Authentication Required)
```
GET  /api/auth/me             - Get current user info
```

### Editor+ Endpoints
```
GET  /api/users/              - List all users
GET  /api/users/{id}          - Get specific user
```

### Admin-Only Endpoints
```
PUT    /api/users/{id}              - Update user
DELETE /api/users/{id}              - Delete user
POST   /api/users/{id}/activate     - Activate user account
POST   /api/users/{id}/deactivate   - Deactivate user account
```

## Routes

### Public Routes
- `/` - Portfolio homepage
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Requires Login)
- `/dashboard` - User dashboard
- `/dashboard/users` - User management (Editor+)
- `/dashboard/admin` - Admin panel (Admin only)
- `/unauthorized` - Access denied page

## Security Measures

### Backend Security
1. **Password Security**
   - Bcrypt hashing with salt
   - Minimum 6 characters
   - Never stored in plain text

2. **Token Security**
   - JWT with secret key
   - 30-minute expiration
   - Signed and verified

3. **Access Control**
   - Role-based permissions
   - Endpoint protection
   - User activation status check

4. **Database Security**
   - SQLAlchemy ORM (SQL injection protection)
   - Parameterized queries
   - Input validation

5. **CORS Protection**
   - Configured for specific origin
   - Credentials support
   - Controlled methods/headers

### Frontend Security
1. **Token Management**
   - Stored in localStorage
   - Included in API requests
   - Removed on logout

2. **Route Protection**
   - useRequireAuth hook
   - Automatic redirects
   - Role checking

3. **Input Validation**
   - Client-side validation
   - Error handling
   - Type safety (TypeScript)

## Usage Examples

### Login Flow
1. User navigates to `/login`
2. Enters credentials
3. Backend validates and returns JWT token
4. Frontend stores token and redirects to `/dashboard`
5. Navbar updates to show user info

### Protected Route Access
1. User tries to access `/dashboard/admin`
2. `useRequireAuth` hook checks authentication
3. If not logged in: redirect to `/login`
4. If wrong role: redirect to `/unauthorized`
5. If authorized: show page content

### User Management (Admin)
1. Admin logs in
2. Navigates to `/dashboard/users`
3. Views list of all users
4. Can activate/deactivate/delete users
5. Changes are reflected immediately

## Default Credentials

**Admin Account** (created automatically):
- Email: `admin@portfolio.com`
- Password: `admin123`
- Role: Admin

**⚠️ Important**: Change these credentials after first login in production!

## Configuration

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@localhost/portfolio_db
SECRET_KEY=your-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Testing the System

### Test as Admin
1. Login with admin credentials
2. Access all features:
   - Dashboard
   - User management
   - Admin panel
3. Try managing users (activate, deactivate, delete)

### Test as Editor
1. Create a new user with Editor role
2. Login with editor credentials
3. Verify access:
   - ✅ Can view users
   - ❌ Cannot manage users
   - ❌ Cannot access admin panel

### Test as Viewer
1. Register a new account (default role: Viewer)
2. Login with viewer credentials
3. Verify access:
   - ✅ Can view dashboard
   - ❌ Cannot view users list
   - ❌ Cannot access admin features

## Future Enhancements

Potential features to add:
- [ ] Password reset via email
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] OAuth integration (Google, GitHub)
- [ ] Session management (multiple devices)
- [ ] Audit logs
- [ ] Rate limiting
- [ ] Password strength meter
- [ ] Remember me functionality
- [ ] Profile picture upload
- [ ] User activity tracking

## Maintenance

### Changing User Roles
```python
# As Admin, use PUT /api/users/{id}
{
  "role": "editor"  # or "admin" or "viewer"
}
```

### Resetting Admin Password
1. Access the database directly
2. Update the hashed_password field
3. Or delete admin user and restart server (auto-recreates)

### Monitoring
- Check API logs: Backend console output
- Check auth errors: Browser console
- Review failed logins: Backend logs
- Monitor token expiration issues

---

**System Status**: ✅ Fully Operational

All authentication features are implemented and ready for use.
