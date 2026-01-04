# Contract: Authentication Error Responses

**Phase**: 2.3 | **Type**: HTTP Error Contract | **Date**: 2026-01-03

## Overview

Defines the standard error response format for authentication and authorization failures in Phase 2.3.

---

## Error Response Format

All authentication/authorization errors follow this structure:

```json
{
  "detail": "Human-readable error message"
}
```

**Note**: This uses FastAPI's default error format for compatibility with existing Phase 2.2 error handling.

---

## 401 Unauthorized Errors

Returned when authentication fails.

### MISSING_TOKEN

**When**: No Authorization header present

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "detail": "Authentication required"
}
```

### INVALID_TOKEN_FORMAT

**When**: Authorization header is not "Bearer <token>" format

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "detail": "Invalid authorization header format"
}
```

### INVALID_TOKEN

**When**: JWT signature verification fails

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "detail": "Invalid authentication token"
}
```

### TOKEN_EXPIRED

**When**: JWT `exp` claim is in the past

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "detail": "Authentication token expired"
}
```

### MISSING_CLAIMS

**When**: Required claims (`sub`, `email`) not in JWT payload

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "detail": "Token missing required claims"
}
```

---

## 403 Forbidden Errors

Returned when authenticated but not authorized for the resource.

### FORBIDDEN

**When**: Valid token but attempting to access another user's task

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "detail": "Access denied"
}
```

---

## Error Code Summary

| HTTP Status | Error Code | detail Message | Trigger |
|-------------|------------|----------------|---------|
| 401 | MISSING_TOKEN | "Authentication required" | No header |
| 401 | INVALID_TOKEN_FORMAT | "Invalid authorization header format" | Malformed |
| 401 | INVALID_TOKEN | "Invalid authentication token" | Bad signature |
| 401 | TOKEN_EXPIRED | "Authentication token expired" | Past exp |
| 401 | MISSING_CLAIMS | "Token missing required claims" | No sub/email |
| 403 | FORBIDDEN | "Access denied" | Wrong owner |

---

## Headers

All 401 responses include:

```http
WWW-Authenticate: Bearer
```

---

## Comparison to Phase 2.2 Errors

| Scenario | Phase 2.2 | Phase 2.3 |
|----------|-----------|-----------|
| Missing user context | 400 (X-User-Id required) | 401 (Auth required) |
| Task not found | 404 | 404 |
| Wrong user's task | 404 | **403** (new behavior) |
| Validation error | 422 | 422 (unchanged) |

---

## Implementation Notes

1. All auth errors should be raised as `HTTPException` with appropriate status code
2. Use consistent message strings (copy from this contract)
3. The 403 for cross-user access requires CRUD layer awareness of ownership
