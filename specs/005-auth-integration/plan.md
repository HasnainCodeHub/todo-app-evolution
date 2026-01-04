# Implementation Plan: Phase 2.3 Authentication (Better Auth + JWT)

**Branch**: `005-auth-integration` | **Date**: 2026-01-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-auth-integration/spec.md`

## Summary

Phase 2.3 secures the existing Phase 2.2 REST API by integrating JWT-based authentication. The backend will verify JWT tokens issued by Better Auth on the frontend, extract user identity from token claims, and enforce user-scoped access to all task operations. The temporary X-User-Id header mechanism from Phase 2.2 will be completely removed and replaced with JWT-based authentication.

**Approach**: Use PyJWT library with HS256 shared secret for token verification, implemented as a FastAPI dependency that replaces the existing `get_user_id` dependency.

---

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: FastAPI, SQLModel, PyJWT[crypto] (new)
**Storage**: Neon PostgreSQL (unchanged from Phase 2.1)
**Testing**: pytest
**Target Platform**: Linux/Windows server
**Project Type**: Web application (backend only for this phase)
**Performance Goals**: <200ms p95 for authenticated requests
**Constraints**: No API path changes, no database schema changes, no frontend UI changes
**Scale/Scope**: Single-user authentication per request, JWT verification on every request

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Check (PASSED)

| Principle | Status | Notes |
|-----------|--------|-------|
| 1.1 Spec-Driven Development | PASS | spec.md exists with full requirements |
| 1.2 No Manual Coding | PASS | Implementation via Claude Code only |
| 1.3 Agentic Dev Stack | PASS | Using AGENTS.md + Spec-Kit Plus + Claude Code |
| 2.1 Phase Sequential | PASS | Phase 2.2 complete, proceeding to 2.3 |
| 2.2 Phase Scope Isolation | PASS | Only adding auth, no future-phase tech |
| 3.2 Phase II Stack | PASS | Using FastAPI, PyJWT (auth library) |
| 4.1 Specification Authority | PASS | All requirements in spec.md |
| 4.2 No Spec Bypass | PASS | No invented endpoints/fields |
| 6.1 Test Requirements | PASS | Testable acceptance criteria defined |

### Post-Design Check (PASSED)

| Principle | Status | Notes |
|-----------|--------|-------|
| All Pre-Design | PASS | No regressions |
| Minimal Change | PASS | Only modifying auth dependency + routes |
| No Database Changes | PASS | No schema modifications |
| No API Path Changes | PASS | All endpoints remain same paths |

---

## Project Structure

### Documentation (this feature)

```text
specs/005-auth-integration/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # JWT library research, Better Auth integration
├── data-model.md        # AuthenticatedUser, JWT payload structures
├── quickstart.md        # Implementation guide
├── contracts/           # API contracts
│   ├── auth-dependency.md    # get_current_user dependency contract
│   └── error-responses.md    # 401/403 error format contract
└── tasks.md             # Implementation tasks (created by /sp.tasks)
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── main.py              # FastAPI application (unchanged)
│   ├── config.py            # Extended with JWT settings
│   ├── database.py          # Database connection (unchanged)
│   ├── models/              # SQLModel models (unchanged)
│   │   └── task.py
│   ├── routers/             # API route handlers
│   │   └── tasks.py         # Updated to use JWT auth dependency
│   ├── schemas/             # Pydantic schemas (unchanged)
│   │   └── task.py
│   ├── crud/                # Data access layer
│   │   └── task.py          # Minor update for 403 vs 404 distinction
│   └── dependencies/        # FastAPI dependencies
│       ├── __init__.py      # Updated exports
│       ├── user.py          # REMOVED (X-User-Id dependency)
│       └── auth.py          # NEW: JWT auth dependency
└── tests/
    └── test_auth.py         # NEW: Authentication tests
```

**Structure Decision**: Web application structure (backend only). Phase 2.3 modifies existing backend files, adds one new file (`auth.py`), and removes one file (`user.py`).

---

## Architecture Decisions

### AD-1: JWT Library Selection

**Decision**: Use PyJWT with cryptography extras
**Rationale**: FastAPI recommends PyJWT over deprecated python-jose
**Trade-offs**: PyJWT is simpler but less feature-rich than authlib
**Reference**: [research.md](./research.md#1-jwt-verification-library-selection)

### AD-2: Token Verification Method

**Decision**: Shared secret (HS256) verification
**Rationale**: Simpler than JWKS for Phase 2.3 scope; JWKS can be added later
**Trade-offs**: Requires secret sharing between frontend and backend
**Reference**: [research.md](./research.md#3-jwt-verification-strategy)

### AD-3: Cross-User Access Response

**Decision**: Return 403 Forbidden (not 404) when task exists but belongs to different user
**Rationale**: Security best practice to distinguish auth failures from not-found
**Trade-offs**: Slightly more complex CRUD logic
**Reference**: [spec.md](./spec.md#user-story-3---cross-user-access-prevention)

---

## Implementation Sequence

### Phase 1: Configuration & Dependencies

1. Add PyJWT[crypto] to dependencies
2. Extend Settings class with JWT configuration
3. Add JWT environment variables to .env.example

### Phase 2: Authentication Dependency

4. Create `AuthenticatedUser` dataclass
5. Implement `get_current_user` dependency
6. Add JWT verification logic with proper error handling

### Phase 3: Route Integration

7. Update tasks router to use new auth dependency
8. Replace all `get_user_id` usages with `get_current_user`
9. Update route handlers to use `current_user.user_id`

### Phase 4: CRUD Enhancement

10. Modify `get_task` to support 403 vs 404 distinction
11. Update route handlers to check ownership and return 403
12. Verify all CRUD operations use authenticated user_id

### Phase 5: Cleanup & Validation

13. Remove `get_user_id` dependency (X-User-Id handling)
14. Update dependency __init__.py exports
15. Write authentication tests
16. Verify all acceptance criteria pass

---

## Security Considerations

1. **Secret Management**: JWT_SECRET must never be committed; use .env
2. **Token Validation**: Always verify signature, expiration, and required claims
3. **Error Messages**: Generic auth errors to prevent information leakage
4. **User Isolation**: All data access scoped by authenticated user_id
5. **No Fallback**: Complete removal of X-User-Id; no backdoor authentication

---

## Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| JWT secret mismatch with frontend | Medium | High | Document secret sharing process |
| Better Auth uses EdDSA not HS256 | Low | Medium | Research confirms HS256 support; can configure |
| Performance regression from JWT verification | Low | Low | JWT verification is fast (<1ms) |

---

## Complexity Tracking

> No constitution violations requiring justification.

This phase maintains minimal complexity:
- Single new file (auth.py)
- Single removed file (user.py)
- Minimal modifications to existing files
- No database changes
- No API path changes

---

## Success Criteria Mapping

| Spec Criterion | Implementation |
|----------------|----------------|
| SC-001: 100% unauthenticated → 401 | get_current_user raises HTTPException 401 |
| SC-002: 100% cross-user → 403 | CRUD + route ownership check returns 403 |
| SC-003: Zero data leakage | All queries scoped by user_id from JWT |
| SC-004: Authenticated access works | get_current_user returns AuthenticatedUser |
| SC-005: X-User-Id non-functional | get_user_id dependency removed |
| SC-006: API paths unchanged | No route path modifications |
| SC-007: Consistent error format | HTTPException with standard detail |

---

## Next Steps

1. Run `/sp.tasks` to generate implementation task breakdown
2. Execute tasks in sequence
3. Run security validation gate before declaring complete
4. Upon completion, authorize Phase 2.4 — Frontend Integration & UX Polish
