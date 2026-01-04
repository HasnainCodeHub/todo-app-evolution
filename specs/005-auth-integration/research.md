# Research: Phase 2.3 Authentication (Better Auth + JWT)

**Branch**: `005-auth-integration` | **Date**: 2026-01-03 | **Spec**: [spec.md](./spec.md)

## Research Summary

This document captures research findings for implementing JWT-based authentication in FastAPI, integrating with Better Auth on the frontend.

---

## 1. JWT Verification Library Selection

### Decision: PyJWT with cryptography extras

**Rationale**:
- FastAPI has moved away from python-jose (deprecated, Python 3.10+ compatibility issues)
- PyJWT is the recommended library per FastAPI official documentation
- PyJWT provides focused, simple API for JWT operations
- The `pyjwt[crypto]` extra provides EdDSA/RSA/ECDSA support

**Alternatives Considered**:
| Library | Status | Verdict |
|---------|--------|---------|
| python-jose | Deprecated | Rejected - compatibility issues |
| PyJWT | Active, recommended | **Selected** |
| authlib | Active | Over-engineered for our needs |

**Installation**: `pyjwt[crypto]`

---

## 2. Better Auth JWT Token Structure

### Decision: Support Better Auth's default payload structure

**Rationale**:
Better Auth JWT tokens include the following claims by default:
- `sub` (subject): User ID (customizable, defaults to user.id)
- `iss` (issuer): BASE_URL of the frontend
- `aud` (audience): BASE_URL of the frontend
- `iat` (issued at): Unix timestamp
- `exp` (expiration): Unix timestamp (default: 15 minutes)
- User object fields (id, email, etc.)

**Key Insight**: Better Auth uses **EdDSA (Ed25519)** as the default signing algorithm, not HS256.

### Token Verification Approach

**Decision**: JWKS-based verification via remote fetch

**Rationale**:
- Better Auth exposes a JWKS endpoint at `/api/auth/jwks`
- Public keys can be cached indefinitely (not subject to frequent changes)
- This approach allows key rotation without backend config changes
- Aligns with Better Auth's asymmetric signing model

**Alternative Considered**:
- Shared secret (HS256): Rejected - Better Auth defaults to EdDSA
- Environment variable for public key: Feasible but less flexible than JWKS

**Implementation Pattern**:
```python
# Fetch JWKS from frontend on startup or first request
# Cache the keyset, refresh only when kid mismatch occurs
```

---

## 3. JWT Verification Strategy

### Decision: Hybrid approach with JWKS fetch and caching

**Rationale**:
1. On startup or first request, fetch JWKS from frontend's `/api/auth/jwks`
2. Cache the JWK Set locally
3. On each request, verify JWT against cached keyset
4. If `kid` in JWT header doesn't match cached keys, refresh JWKS

**Configuration Required**:
| Variable | Purpose | Example |
|----------|---------|---------|
| `BETTER_AUTH_URL` | Frontend URL for JWKS fetch | `http://localhost:3000` |
| `JWT_ISSUER` | Expected issuer claim | `http://localhost:3000` |
| `JWT_AUDIENCE` | Expected audience claim | `http://localhost:3000` |

**Fallback Option**:
If JWKS fetch is complex for Phase 2.3, an alternative is:
- Configure Better Auth to use HS256 with a shared secret
- Set `JWT_SECRET` environment variable for backend verification
- Simpler but requires frontend configuration change

### Recommended Approach for Phase 2.3

**Decision**: Use shared secret (HS256) for simplicity

**Rationale**:
- Phase 2.3 scope is minimally invasive
- JWKS requires additional complexity (HTTP client, caching, retry logic)
- Shared secret verification is straightforward with PyJWT
- Better Auth supports configuring the signing algorithm
- Can upgrade to EdDSA + JWKS in a future phase if needed

**Implementation**:
```python
import jwt

def verify_token(token: str, secret: str) -> dict:
    return jwt.decode(
        token,
        secret,
        algorithms=["HS256"],
        audience="expected-audience",
        issuer="expected-issuer"
    )
```

---

## 4. FastAPI Authentication Dependency Pattern

### Decision: Use FastAPI's `Depends()` with OAuth2PasswordBearer

**Rationale**:
- Industry-standard pattern for FastAPI JWT authentication
- Automatic extraction of Bearer token from Authorization header
- Integration with OpenAPI documentation
- Clear separation of concerns

**Pattern**:
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"user_id": user_id, "email": payload.get("email")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

---

## 5. Error Response Format

### Decision: Maintain Phase 2.2 error format consistency

**Rationale**:
Phase 2.2 established error response format. Authentication errors should follow the same pattern.

**Format** (from Phase 2.2 spec):
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

**Authentication-Specific Error Codes**:
| HTTP Status | Error Code | Message | When |
|-------------|------------|---------|------|
| 401 | `MISSING_TOKEN` | "Authentication required" | No Authorization header |
| 401 | `INVALID_TOKEN` | "Invalid authentication token" | Malformed/invalid JWT |
| 401 | `TOKEN_EXPIRED` | "Authentication token expired" | JWT past expiration |
| 403 | `FORBIDDEN` | "Access denied" | Valid token but wrong user |

**Note**: The current Phase 2.2 implementation uses FastAPI's default `detail` field. Phase 2.3 should introduce the nested error format for auth errors while maintaining backward compatibility.

---

## 6. X-User-Id Header Removal Strategy

### Decision: Complete replacement, no fallback

**Rationale**:
- FR-010 and FR-011 in spec mandate removal and ignoring of X-User-Id
- No backward compatibility needed (this is a security enforcement)
- User identity MUST come exclusively from JWT

**Implementation**:
1. Remove the `get_user_id` dependency that reads X-User-Id
2. Replace with `get_current_user` dependency that reads JWT
3. Update all route handlers to use new dependency
4. The new dependency extracts `user_id` from JWT payload

---

## 7. Cross-User Access Prevention

### Decision: Rely on existing user-scoped data access layer

**Rationale**:
- Phase 2.1/2.2 already implements user-scoped queries in CRUD layer
- All `crud.get_task()`, `crud.update_task()`, `crud.delete_task()` already filter by `user_id`
- Phase 2.3 only needs to ensure `user_id` comes from JWT instead of header
- Return 403 when task exists but belongs to different user (requires minor CRUD enhancement)

**Current Behavior** (Phase 2.2):
- Task not found OR wrong user → 404 Not Found

**Required Change for Phase 2.3**:
- Task exists but wrong user → 403 Forbidden
- Task truly not found → 404 Not Found

This requires the CRUD layer to distinguish between "not found" and "not owned".

**Implementation Approach**:
1. Modify `get_task` to first check if task exists (any user)
2. If exists but different user → return specific indicator
3. Route handler converts this to 403 Forbidden

---

## 8. Environment Configuration

### Decision: Add JWT-specific environment variables

**Variables Required**:
```env
# Better Auth Integration
JWT_SECRET=your-shared-secret-key
JWT_ALGORITHM=HS256
JWT_ISSUER=http://localhost:3000
JWT_AUDIENCE=http://localhost:3000
JWT_EXPIRATION_MINUTES=15
```

**Note**: `JWT_SECRET` MUST match Better Auth's configured secret.

---

## 9. Dependency Installation

### Decision: Add PyJWT to backend dependencies

**Package**: `pyjwt[crypto]`

**Reason for crypto extra**:
- Required for EdDSA/RSA support (future-proofing)
- Better Auth may use EdDSA by default
- Minimal overhead, significant flexibility

---

## 10. Testing Strategy

### Decision: Unit tests with mocked JWT tokens

**Approach**:
1. Create test fixtures that generate valid/invalid JWTs
2. Test authentication dependency in isolation
3. Integration tests verify full request flow
4. Edge case tests for expired, malformed, missing tokens

**Test Categories**:
- Valid token → request succeeds
- Missing token → 401
- Expired token → 401
- Invalid signature → 401
- Valid token, wrong user's task → 403
- Valid token, user's own task → success

---

## Sources

- [FastAPI OAuth2 with JWT](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
- [Better Auth JWT Plugin](https://www.better-auth.com/docs/plugins/jwt)
- [PyJWT Documentation](https://pyjwt.readthedocs.io/)
- [FastAPI JWT Discussion](https://github.com/fastapi/fastapi/discussions/9587)
- [JWT Best Practices](https://curity.io/resources/learn/jwt-best-practices/)

---

## Open Questions Resolved

| Question | Resolution |
|----------|------------|
| JWT library to use? | PyJWT (python-jose deprecated) |
| Signing algorithm? | HS256 with shared secret (simpler for Phase 2.3) |
| JWKS vs shared secret? | Shared secret for Phase 2.3, JWKS can be added later |
| Error response format? | Nested `{"error": {...}}` format per Phase 2.2 |
| 403 vs 404 for wrong user? | 403 Forbidden (distinguishes from true not-found) |
