# Data Model: Phase 2.3 Authentication (Better Auth + JWT)

**Branch**: `005-auth-integration` | **Date**: 2026-01-03 | **Spec**: [spec.md](./spec.md)

## Overview

Phase 2.3 does NOT introduce new database entities. This document defines the in-memory data structures used for JWT-based authentication. All entities are transient (request-scoped) and do not persist to the database.

---

## 1. JWT Token Structure

### JWTPayload (Transient - from token decode)

Represents the decoded JWT payload received from Better Auth.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| sub | string | Yes | Subject - User ID (primary identifier) |
| email | string | Yes | User's email address |
| iat | integer | Yes | Issued At - Unix timestamp |
| exp | integer | Yes | Expiration - Unix timestamp |
| iss | string | No | Issuer - Better Auth URL |
| aud | string | No | Audience - Application URL |

**Validation Rules**:
- `sub` must be non-empty string
- `email` must be valid email format
- `exp` must be in the future (not expired)
- `iss` must match configured issuer (if configured)
- `aud` must match configured audience (if configured)

**Source**: Decoded from Authorization: Bearer <token> header

---

## 2. Authenticated User Context

### AuthenticatedUser (Transient - request-scoped)

Represents the authenticated user context passed to route handlers.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| user_id | string | Yes | User identifier from JWT `sub` claim |
| email | string | Yes | User email from JWT `email` claim |

**Lifecycle**: Created per-request from JWT, discarded after response

**Usage**: Passed via FastAPI dependency injection to route handlers

---

## 3. Authentication Error Types

### AuthErrorCode (Enumeration)

Error codes for authentication failures.

| Code | HTTP Status | Description |
|------|-------------|-------------|
| MISSING_TOKEN | 401 | No Authorization header present |
| INVALID_TOKEN_FORMAT | 401 | Authorization header malformed |
| INVALID_TOKEN | 401 | JWT signature verification failed |
| TOKEN_EXPIRED | 401 | JWT expiration time passed |
| MISSING_CLAIMS | 401 | Required claims (sub, email) missing |
| FORBIDDEN | 403 | Valid token but unauthorized access |

---

## 4. Relationship to Existing Entities

### Task (Existing - Phase 2.1)

No modifications required to the Task model.

**Current Structure** (unchanged):
```
Task
├── id: int (PK, auto-generated)
├── user_id: string (owner identifier)
├── title: string (required)
├── description: string (optional)
├── completed: bool (default: false)
├── created_at: datetime
└── updated_at: datetime
```

**Relationship to AuthenticatedUser**:
- `Task.user_id` matches `AuthenticatedUser.user_id`
- All task queries are scoped by authenticated user's ID
- Ownership enforcement occurs at the API layer

---

## 5. State Transitions

### Authentication Flow States

```
┌─────────────┐
│   Request   │
│   Arrives   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Check Authorization │
│      Header         │
└──────┬──────────────┘
       │
       ├── Missing ──────► 401 MISSING_TOKEN
       │
       ▼
┌─────────────────────┐
│ Extract Bearer      │
│ Token               │
└──────┬──────────────┘
       │
       ├── Malformed ────► 401 INVALID_TOKEN_FORMAT
       │
       ▼
┌─────────────────────┐
│ Verify JWT          │
│ Signature           │
└──────┬──────────────┘
       │
       ├── Invalid ──────► 401 INVALID_TOKEN
       │
       ▼
┌─────────────────────┐
│ Check Expiration    │
└──────┬──────────────┘
       │
       ├── Expired ──────► 401 TOKEN_EXPIRED
       │
       ▼
┌─────────────────────┐
│ Extract Claims      │
│ (sub, email)        │
└──────┬──────────────┘
       │
       ├── Missing ──────► 401 MISSING_CLAIMS
       │
       ▼
┌─────────────────────┐
│ Create              │
│ AuthenticatedUser   │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Proceed to Route    │
│ Handler             │
└─────────────────────┘
```

### Task Access Authorization Flow

```
┌─────────────────────┐
│ Route Handler       │
│ with user context   │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Query Task by ID    │
│ (any owner)         │
└──────┬──────────────┘
       │
       ├── Not Found ────► 404 NOT_FOUND
       │
       ▼
┌─────────────────────┐
│ Check Ownership     │
│ task.user_id ==     │
│ auth.user_id?       │
└──────┬──────────────┘
       │
       ├── No ───────────► 403 FORBIDDEN
       │
       ▼
┌─────────────────────┐
│ Process Request     │
│ (read/update/delete)│
└─────────────────────┘
```

---

## 6. Configuration Schema

### Settings (Extended)

Environment variables for JWT configuration.

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| JWT_SECRET | string | Yes | - | Shared secret with Better Auth |
| JWT_ALGORITHM | string | No | HS256 | JWT signing algorithm |
| JWT_ISSUER | string | No | - | Expected issuer claim |
| JWT_AUDIENCE | string | No | - | Expected audience claim |

---

## 7. No Database Changes

**Constraint Reminder** (from spec):
- No new tables
- No schema modifications
- No migrations required

Phase 2.3 authentication is purely an API-layer concern.
