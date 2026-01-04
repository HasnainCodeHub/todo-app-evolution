# Feature Specification: Phase 2.3 Authentication (Better Auth + JWT)

**Feature Branch**: `005-auth-integration`
**Created**: 2026-01-03
**Status**: Draft
**Input**: User description: "Secure the Phase 2.2 REST API by integrating Better Auth on the frontend for JWT issuance, verifying JWT tokens on the FastAPI backend, enforcing authenticated user-scoped access to all task operations, and removing temporary pre-auth mechanisms."

## Overview

Phase 2.3 introduces authentication and authorization to the existing backend REST API using Better Auth on the frontend and JWT verification on the FastAPI backend. This phase secures all task operations so that users can only access and modify their own data.

**This phase does NOT introduce new endpoints or frontend UI changes. It strictly secures existing APIs.**

## Scope

### In Scope

- JWT verification middleware/dependencies in FastAPI
- User identity extraction from JWT
- Enforcement of user-scoped task access
- Removal of X-User-Id header usage
- Environment-based secret configuration

### Out of Scope

- New REST endpoints
- Frontend UI redesign
- Role-based access control (RBAC)
- Token refresh logic
- OAuth providers beyond Better Auth defaults
- Session-based authentication

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Authenticated Task Access (Priority: P1)

As an authenticated user, I want all my task operations to be secured with my identity token so that only I can access and modify my tasks.

**Why this priority**: This is the core security feature - without authenticated access, the entire system remains insecure and user data is not protected.

**Independent Test**: Can be fully tested by making API requests with valid JWT tokens and verifying that task operations succeed and return only the authenticated user's data.

**Acceptance Scenarios**:

1. **Given** a user has a valid JWT token, **When** they request their task list, **Then** the system returns only tasks belonging to that user
2. **Given** a user has a valid JWT token, **When** they create a new task, **Then** the task is associated with their user identity from the token
3. **Given** a user has a valid JWT token, **When** they update or delete their own task, **Then** the operation succeeds

---

### User Story 2 - Rejection of Unauthenticated Requests (Priority: P1)

As a system operator, I want all unauthenticated API requests to be rejected so that the system enforces security boundaries.

**Why this priority**: Equally critical to P1 - the system must reject requests without valid tokens to maintain security.

**Independent Test**: Can be fully tested by making API requests without tokens or with malformed tokens and verifying 401 responses.

**Acceptance Scenarios**:

1. **Given** a request with no Authorization header, **When** any task endpoint is called, **Then** the system returns 401 Unauthorized
2. **Given** a request with an invalid JWT token, **When** any task endpoint is called, **Then** the system returns 401 Unauthorized
3. **Given** a request with an expired JWT token, **When** any task endpoint is called, **Then** the system returns 401 Unauthorized

---

### User Story 3 - Cross-User Access Prevention (Priority: P1)

As a user, I want the system to prevent other users from accessing my tasks so that my data remains private.

**Why this priority**: Critical security requirement - user data isolation is fundamental to the authentication system.

**Independent Test**: Can be fully tested by attempting to access, modify, or delete tasks belonging to a different user and verifying 403 responses.

**Acceptance Scenarios**:

1. **Given** User A has a valid JWT, **When** User A attempts to view User B's task by ID, **Then** the system returns 403 Forbidden
2. **Given** User A has a valid JWT, **When** User A attempts to update User B's task, **Then** the system returns 403 Forbidden
3. **Given** User A has a valid JWT, **When** User A attempts to delete User B's task, **Then** the system returns 403 Forbidden

---

### User Story 4 - X-User-Id Header Removal (Priority: P2)

As a system operator, I want the temporary X-User-Id header mechanism removed so that user identity is derived solely from JWT tokens.

**Why this priority**: Important for security hardening but depends on JWT verification being in place first.

**Independent Test**: Can be fully tested by sending requests with X-User-Id header and verifying the header is ignored in favor of JWT identity.

**Acceptance Scenarios**:

1. **Given** a request with both JWT token and X-User-Id header, **When** any task endpoint is called, **Then** the system uses only the JWT identity and ignores X-User-Id
2. **Given** a request with only X-User-Id header (no JWT), **When** any task endpoint is called, **Then** the system returns 401 Unauthorized

---

### Edge Cases

- What happens when JWT signature is invalid? → 401 Unauthorized
- What happens when JWT is well-formed but contains unknown user_id? → Request proceeds but returns empty results (no tasks for unknown user)
- What happens when JWT payload is missing required claims (user_id, email)? → 401 Unauthorized
- What happens when JWT secret mismatch between frontend and backend? → 401 Unauthorized (signature validation fails)
- How does system handle concurrent requests with same valid token? → All requests processed normally
- What happens when a task ID exists but belongs to a different user? → 403 Forbidden

## Requirements *(mandatory)*

### Functional Requirements

#### Authentication

- **FR-001**: System MUST require a valid JWT token in the Authorization header for all task endpoints
- **FR-002**: System MUST validate JWT signature using a shared secret configured via environment variables
- **FR-003**: System MUST validate JWT expiration and reject expired tokens
- **FR-004**: System MUST extract user identity (user_id, email) from the JWT payload
- **FR-005**: System MUST reject requests with missing, malformed, or invalid JWT tokens with 401 Unauthorized

#### Authorization

- **FR-006**: System MUST filter all task queries to return only tasks belonging to the authenticated user
- **FR-007**: System MUST associate newly created tasks with the authenticated user's identity
- **FR-008**: System MUST verify task ownership before allowing update or delete operations
- **FR-009**: System MUST return 403 Forbidden when a user attempts to access another user's task

#### Legacy Mechanism Removal

- **FR-010**: System MUST NOT use X-User-Id header for user identification
- **FR-011**: System MUST ignore X-User-Id header if present in requests

#### Error Handling

- **FR-012**: System MUST return consistent error response format for authentication errors:
  ```
  {
    "error": {
      "code": "ERROR_CODE",
      "message": "Human-readable message"
    }
  }
  ```
- **FR-013**: System MUST return 401 Unauthorized for missing/invalid tokens
- **FR-014**: System MUST return 403 Forbidden for valid tokens attempting unauthorized access

#### Configuration

- **FR-015**: System MUST read JWT secret from environment configuration
- **FR-016**: Backend and frontend MUST share the same JWT secret for token verification

### JWT Payload Requirements

The JWT payload MUST include:
- **user_id**: String - Unique identifier for the user
- **email**: String - User's email address
- **iat**: Number - Issued at timestamp
- **exp**: Number - Expiration timestamp

### Key Entities

- **JWT Token**: Authentication credential issued by Better Auth on frontend, verified by backend; contains user identity claims
- **Authenticated User**: User whose identity is extracted from a valid JWT; serves as the security principal for all operations
- **Task Ownership**: Relationship between a task and its owning user; enforced via user_id matching

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of task API requests without valid JWT return 401 Unauthorized
- **SC-002**: 100% of task API requests attempting cross-user access return 403 Forbidden
- **SC-003**: Users can only view tasks they own - zero data leakage between users
- **SC-004**: All task operations complete successfully for authenticated users accessing their own data
- **SC-005**: X-User-Id header is completely non-functional - ignored by all endpoints
- **SC-006**: Existing API paths and methods remain unchanged (only security behavior added)
- **SC-007**: Error responses follow consistent format for all authentication/authorization failures

## Constraints (Critical)

- No API path changes
- No database schema changes
- No frontend UI redesign
- No role system (RBAC)
- No session-based authentication
- No token refresh logic

## Dependencies

- **Phase 2.2**: REST API Layer must be complete and functional
- **Better Auth**: Frontend must be configured to issue JWT tokens
- **Shared Secret**: Backend and frontend must share JWT signing secret via environment configuration

## Assumptions

- Better Auth is already configured on the frontend and issuing valid JWT tokens
- The JWT secret will be provided via environment variables (e.g., `JWT_SECRET`)
- Standard HS256 algorithm will be used for JWT signing/verification (industry default)
- Token expiration validation uses standard UTC timestamp comparison
- The existing task endpoints (CRUD operations) are functioning correctly per Phase 2.2

## Next Phase Dependency

Completion of Phase 2.3 authorizes:
- **Phase 2.4** — Frontend Integration & UX Polish
