# Contract: Authentication Dependency

**Phase**: 2.3 | **Type**: FastAPI Dependency | **Date**: 2026-01-03

## Overview

Defines the contract for the `get_current_user` FastAPI dependency that replaces the Phase 2.2 `get_user_id` dependency.

---

## Dependency Signature

```python
async def get_current_user(
    authorization: str = Header(None)
) -> AuthenticatedUser
```

### Input

| Parameter | Source | Type | Required |
|-----------|--------|------|----------|
| authorization | HTTP Header `Authorization` | string | Yes |

### Output

**Success**: `AuthenticatedUser` object

```python
class AuthenticatedUser:
    user_id: str  # From JWT 'sub' claim
    email: str    # From JWT 'email' claim
```

**Failure**: Raises `HTTPException`

---

## Error Responses

### 401 Unauthorized

**Condition**: Authentication failed

| Scenario | Error Code | Message |
|----------|------------|---------|
| No Authorization header | MISSING_TOKEN | "Authentication required" |
| Not Bearer format | INVALID_TOKEN_FORMAT | "Invalid authorization header format" |
| Invalid JWT signature | INVALID_TOKEN | "Invalid authentication token" |
| JWT expired | TOKEN_EXPIRED | "Authentication token expired" |
| Missing sub/email claims | MISSING_CLAIMS | "Token missing required claims" |

**Response Format**:
```json
{
  "detail": "Human-readable message"
}
```

---

## Behavior Specification

### Token Extraction

1. Read `Authorization` header
2. Verify format is `Bearer <token>`
3. Extract the token portion

### Token Verification

1. Decode JWT using configured secret
2. Verify signature with HS256 algorithm
3. Check expiration time (`exp` claim)
4. Optionally verify issuer (`iss`) and audience (`aud`)

### Claim Extraction

1. Extract `sub` claim → `user_id`
2. Extract `email` claim → `email`
3. Both must be non-empty strings

---

## Usage Pattern

```python
from fastapi import Depends
from app.dependencies.auth import get_current_user, AuthenticatedUser

@router.get("/tasks")
async def list_tasks(
    current_user: AuthenticatedUser = Depends(get_current_user)
):
    tasks = crud.get_tasks(user_id=current_user.user_id)
    return tasks
```

---

## Replaces

**Phase 2.2 Dependency**: `get_user_id`

```python
# OLD (Phase 2.2) - TO BE REMOVED
async def get_user_id(x_user_id: str = Header()) -> str
```

---

## Configuration

| Environment Variable | Purpose |
|---------------------|---------|
| JWT_SECRET | Secret key for HS256 verification |
| JWT_ALGORITHM | Algorithm (default: HS256) |
| JWT_ISSUER | Optional issuer validation |
| JWT_AUDIENCE | Optional audience validation |
