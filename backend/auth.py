"""
Authentication module for Govern-AI
Handles Google OAuth via Emergent Auth, user sessions, and role-based access
"""
from fastapi import APIRouter, HTTPException, Request, Response, Depends
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone, timedelta
import uuid
import httpx

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

# Admin email - full access
ADMIN_EMAIL = "martinlepage.ai@gmail.com"

# ============ MODELS ============

class User(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None
    role: str = "client"  # admin, client
    approved: bool = False  # Client needs admin approval to access CompassAI
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class UserSession(BaseModel):
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AccessRequest(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    use_case: str
    message: Optional[str] = None

class AccessRequestResponse(BaseModel):
    id: str
    status: str
    message: str

# ============ DATABASE ============

def get_db():
    from server import db
    return db

# ============ AUTH HELPERS ============

async def get_current_user(request: Request) -> Optional[User]:
    """Get current user from session token in cookie or header"""
    db = get_db()
    
    # Try cookie first
    session_token = request.cookies.get("session_token")
    
    # Fallback to Authorization header
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
    
    if not session_token:
        return None
    
    # Find session
    session_doc = await db.user_sessions.find_one(
        {"session_token": session_token},
        {"_id": 0}
    )
    
    if not session_doc:
        return None
    
    # Check expiry
    expires_at = session_doc["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        return None
    
    # Get user
    user_doc = await db.users.find_one(
        {"user_id": session_doc["user_id"]},
        {"_id": 0}
    )
    
    if not user_doc:
        return None
    
    return User(**user_doc)

async def require_auth(request: Request) -> User:
    """Require authentication - raises 401 if not authenticated"""
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user

async def require_admin(request: Request) -> User:
    """Require admin role - raises 403 if not admin"""
    user = await require_auth(request)
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

async def require_approved_client(request: Request) -> User:
    """Require approved client or admin"""
    user = await require_auth(request)
    if user.role == "admin":
        return user
    if not user.approved:
        raise HTTPException(status_code=403, detail="Access pending approval")
    return user

# ============ ENDPOINTS ============

@router.post("/session")
async def exchange_session(request: Request, response: Response):
    """Exchange Emergent Auth session_id for app session"""
    db = get_db()
    
    body = await request.json()
    session_id = body.get("session_id")
    
    if not session_id:
        raise HTTPException(status_code=400, detail="session_id required")
    
    # Call Emergent Auth to get user data
    async with httpx.AsyncClient() as client:
        auth_response = await client.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": session_id}
        )
    
    if auth_response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    auth_data = auth_response.json()
    email = auth_data.get("email")
    name = auth_data.get("name")
    picture = auth_data.get("picture")
    
    # Check if user exists
    existing_user = await db.users.find_one({"email": email}, {"_id": 0})
    
    if existing_user:
        user_id = existing_user["user_id"]
        # Update user data
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": name, "picture": picture}}
        )
        role = existing_user.get("role", "client")
        approved = existing_user.get("approved", False)
    else:
        # Create new user
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        # Admin gets auto-approved, clients need approval
        is_admin = email == ADMIN_EMAIL
        role = "admin" if is_admin else "client"
        approved = is_admin  # Admin auto-approved
        
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "role": role,
            "approved": approved,
            "created_at": datetime.now(timezone.utc).isoformat()
        })
    
    # Create session
    session_token = f"sess_{uuid.uuid4().hex}"
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at,
        "created_at": datetime.now(timezone.utc)
    })
    
    # Set cookie
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=7 * 24 * 60 * 60  # 7 days
    )
    
    return {
        "user_id": user_id,
        "email": email,
        "name": name,
        "picture": picture,
        "role": role,
        "approved": approved
    }

@router.get("/me")
async def get_me(request: Request):
    """Get current authenticated user"""
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user

@router.post("/logout")
async def logout(request: Request, response: Response):
    """Logout - clear session"""
    db = get_db()
    
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    
    response.delete_cookie(
        key="session_token",
        path="/",
        secure=True,
        samesite="none"
    )
    
    return {"status": "logged_out"}

# Access Requests
@router.post("/request-access", response_model=AccessRequestResponse)
async def request_access(data: AccessRequest):
    """Submit access request (public endpoint)"""
    db = get_db()
    
    request_id = f"REQ-{uuid.uuid4().hex[:8].upper()}"
    
    await db.access_requests.insert_one({
        "id": request_id,
        "name": data.name,
        "email": data.email,
        "company": data.company,
        "use_case": data.use_case,
        "message": data.message,
        "status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    return AccessRequestResponse(
        id=request_id,
        status="pending",
        message="Your access request has been submitted. You'll receive an email once approved."
    )

@router.get("/access-requests")
async def list_access_requests(request: Request):
    """List all access requests (admin only)"""
    await require_admin(request)
    db = get_db()
    
    requests = await db.access_requests.find({}, {"_id": 0}).to_list(100)
    return requests

@router.post("/access-requests/{request_id}/approve")
async def approve_access_request(request_id: str, request: Request):
    """Approve access request and create user (admin only)"""
    await require_admin(request)
    db = get_db()
    
    # Find request
    access_req = await db.access_requests.find_one({"id": request_id}, {"_id": 0})
    if not access_req:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # Check if user already exists
    existing = await db.users.find_one({"email": access_req["email"]}, {"_id": 0})
    if existing:
        # Update existing user to approved
        await db.users.update_one(
            {"email": access_req["email"]},
            {"$set": {"approved": True}}
        )
    else:
        # Create new approved user
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": access_req["email"],
            "name": access_req["name"],
            "role": "client",
            "approved": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        })
    
    # Update request status
    await db.access_requests.update_one(
        {"id": request_id},
        {"$set": {"status": "approved", "approved_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    return {"status": "approved", "email": access_req["email"]}

@router.post("/access-requests/{request_id}/reject")
async def reject_access_request(request_id: str, request: Request):
    """Reject access request (admin only)"""
    await require_admin(request)
    db = get_db()
    
    result = await db.access_requests.update_one(
        {"id": request_id},
        {"$set": {"status": "rejected", "rejected_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Request not found")
    
    return {"status": "rejected"}

# User Management (Admin)
@router.get("/users")
async def list_users(request: Request):
    """List all users (admin only)"""
    await require_admin(request)
    db = get_db()
    
    users = await db.users.find({}, {"_id": 0}).to_list(100)
    return users

@router.post("/users/{user_id}/approve")
async def approve_user(user_id: str, request: Request):
    """Approve user for CompassAI access (admin only)"""
    await require_admin(request)
    db = get_db()
    
    result = await db.users.update_one(
        {"user_id": user_id},
        {"$set": {"approved": True}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"status": "approved", "user_id": user_id}

@router.post("/users/{user_id}/revoke")
async def revoke_user(user_id: str, request: Request):
    """Revoke user's CompassAI access (admin only)"""
    await require_admin(request)
    db = get_db()
    
    result = await db.users.update_one(
        {"user_id": user_id},
        {"$set": {"approved": False}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"status": "revoked", "user_id": user_id}
