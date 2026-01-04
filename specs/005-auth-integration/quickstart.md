# Quickstart: Phase 2.3 Authentication (Better Auth + JWT)

**Branch**: `005-auth-integration` | **Date**: 2026-01-03

## Prerequisites

- Phase 2.2 REST API Layer complete and functional
- Python 3.13+ environment with UV package manager
- Better Auth configured on frontend (issuing JWT tokens)
- Shared JWT secret between frontend and backend

---

## 1. Environment Setup

Add JWT configuration to backend `.env`:

```env
# Existing
DATABASE_URL=your-neon-connection-string

# New for Phase 2.3
JWT_SECRET=your-shared-secret-with-better-auth
JWT_ALGORITHM=HS256
```

**Important**: The `JWT_SECRET` must match the secret configured in Better Auth.

---

## 2. Install Dependencies

Add PyJWT to the backend dependencies:

```bash
cd backend
uv add pyjwt[crypto]
```

---

## 3. Implementation Order

### Step 1: Create Auth Dependency

Create `backend/app/dependencies/auth.py`:

```python
from typing import Annotated
from fastapi import Header, HTTPException, status
import jwt
from ..config import get_settings

class AuthenticatedUser:
    def __init__(self, user_id: str, email: str):
        self.user_id = user_id
        self.email = email

async def get_current_user(
    authorization: Annotated[str | None, Header()] = None
) -> AuthenticatedUser:
    # Implementation per contracts/auth-dependency.md
    ...
```

### Step 2: Update Config

Add JWT settings to `backend/app/config.py`:

```python
class Settings:
    def __init__(self):
        self.database_url = os.getenv("DATABASE_URL", "")
        self.jwt_secret = os.getenv("JWT_SECRET", "")
        self.jwt_algorithm = os.getenv("JWT_ALGORITHM", "HS256")
        # Validation...
```

### Step 3: Replace User Dependency in Routes

Update `backend/app/routers/tasks.py`:

```python
# Before (Phase 2.2)
from ..dependencies import get_user_id

# After (Phase 2.3)
from ..dependencies.auth import get_current_user, AuthenticatedUser

@router.get("/")
async def list_tasks(current_user: AuthenticatedUser = Depends(get_current_user)):
    return crud.get_tasks(user_id=current_user.user_id)
```

### Step 4: Update CRUD for 403 Support

Modify `backend/app/crud/task.py` to distinguish "not found" from "not owned":

```python
def get_task_with_ownership(task_id: int, user_id: str) -> tuple[Task | None, bool]:
    """Returns (task, is_owner) tuple for 403 vs 404 handling."""
    ...
```

### Step 5: Remove X-User-Id Dependency

Delete or deprecate `backend/app/dependencies/user.py`.

---

## 4. Testing

### Generate Test Token

```python
import jwt
from datetime import datetime, timedelta

secret = "your-jwt-secret"
payload = {
    "sub": "user-123",
    "email": "user@example.com",
    "iat": datetime.utcnow(),
    "exp": datetime.utcnow() + timedelta(hours=1)
}
token = jwt.encode(payload, secret, algorithm="HS256")
print(f"Bearer {token}")
```

### Test Requests

```bash
# Authenticated request
curl -X GET http://localhost:8000/api/tasks \
  -H "Authorization: Bearer <token>"

# Missing token (should return 401)
curl -X GET http://localhost:8000/api/tasks

# X-User-Id header (should return 401, no longer works)
curl -X GET http://localhost:8000/api/tasks \
  -H "X-User-Id: user-123"
```

---

## 5. Verification Checklist

- [ ] All task endpoints require valid JWT
- [ ] Requests without Authorization header return 401
- [ ] Requests with invalid/expired tokens return 401
- [ ] X-User-Id header is completely ignored
- [ ] Users can only access their own tasks
- [ ] Accessing another user's task returns 403 (not 404)
- [ ] API paths remain unchanged from Phase 2.2

---

## 6. Common Issues

### "Invalid token" errors
- Verify JWT_SECRET matches between frontend and backend
- Check JWT_ALGORITHM is consistent (HS256)

### "Token expired" errors
- Better Auth default expiry is 15 minutes
- For testing, generate tokens with longer expiry

### 404 instead of 403
- CRUD layer needs ownership check logic
- See Step 4 for implementation pattern
