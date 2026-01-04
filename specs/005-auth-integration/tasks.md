# Tasks: Phase 2.3 Authentication (Better Auth + JWT)

**Input**: Design documents from `/specs/005-auth-integration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/
**Branch**: `005-auth-integration`

**Tests**: Not explicitly requested in spec - tests included in validation phase only.

**Organization**: Tasks grouped by user story priority. Since US1-US3 are all P1 and tightly coupled (all require auth dependency), they are implemented together in the Foundational phase. US4 (P2) is a separate cleanup phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app structure**: `backend/app/` for source code
- Based on plan.md: All changes in `backend/` directory

---

## Phase 1: Setup (Configuration & Dependencies)

**Purpose**: Add PyJWT dependency and extend configuration for JWT verification

- [x] T001 Add PyJWT[crypto] dependency to backend using `uv add pyjwt[crypto]` in backend/
- [x] T002 [P] Extend Settings class with JWT configuration in backend/app/config.py
- [x] T003 [P] Add JWT environment variables to backend/.env.example (JWT_SECRET, JWT_ALGORITHM)

**Checkpoint**: Dependencies installed and configuration ready for auth implementation

---

## Phase 2: Foundational - Authentication Infrastructure (US1, US2, US3 - P1)

**Purpose**: Core authentication dependency that enables ALL P1 user stories

**⚠️ CRITICAL**: This phase implements FR-001 through FR-009 and FR-012 through FR-014

### Authentication Dependency (US1, US2)

**Goal**: Create reusable JWT verification dependency per contracts/auth-dependency.md

- [x] T004 Create AuthenticatedUser dataclass in backend/app/dependencies/auth.py
- [x] T005 Implement get_current_user dependency with Bearer token extraction in backend/app/dependencies/auth.py
- [x] T006 Add JWT signature verification using PyJWT in backend/app/dependencies/auth.py
- [x] T007 Add JWT expiration validation in backend/app/dependencies/auth.py
- [x] T008 Add required claims extraction (sub, email) in backend/app/dependencies/auth.py
- [x] T009 Implement authentication error handling (401 responses) per contracts/error-responses.md in backend/app/dependencies/auth.py

**Checkpoint**: Authentication dependency complete - can verify JWT tokens

### Route Integration (US1)

**Goal**: Apply authentication to all task endpoints

- [ ] T010 Update tasks router imports to use get_current_user in backend/app/routers/tasks.py
- [ ] T011 Replace get_user_id with get_current_user in create_task endpoint in backend/app/routers/tasks.py
- [ ] T012 [P] Replace get_user_id with get_current_user in list_tasks endpoint in backend/app/routers/tasks.py
- [ ] T013 [P] Replace get_user_id with get_current_user in get_task endpoint in backend/app/routers/tasks.py
- [ ] T014 [P] Replace get_user_id with get_current_user in update_task endpoint in backend/app/routers/tasks.py
- [ ] T015 [P] Replace get_user_id with get_current_user in delete_task endpoint in backend/app/routers/tasks.py
- [ ] T016 [P] Replace get_user_id with get_current_user in toggle_task_complete endpoint in backend/app/routers/tasks.py

**Checkpoint**: All routes use JWT authentication - unauthenticated requests return 401

### Cross-User Access Prevention (US3)

**Goal**: Return 403 Forbidden when accessing another user's task (instead of 404)

- [ ] T017 Add task_exists_any_user function to check task existence in backend/app/crud/task.py
- [ ] T018 Update get_task route to check task existence before ownership in backend/app/routers/tasks.py
- [ ] T019 [P] Update update_task route to return 403 for wrong user in backend/app/routers/tasks.py
- [ ] T020 [P] Update delete_task route to return 403 for wrong user in backend/app/routers/tasks.py
- [ ] T021 [P] Update toggle_task_complete route to return 403 for wrong user in backend/app/routers/tasks.py

**Checkpoint**: US1, US2, US3 complete - authenticated access works, 401 for missing/invalid tokens, 403 for cross-user access

---

## Phase 3: User Story 4 - X-User-Id Header Removal (Priority: P2)

**Goal**: Remove temporary Phase 2.2 user identification mechanism completely

**Independent Test**: Send requests with X-User-Id header (no JWT) and verify 401 response

### Implementation for User Story 4

- [ ] T022 [US4] Remove get_user_id import from tasks router in backend/app/routers/tasks.py
- [ ] T023 [US4] Delete get_user_id dependency file in backend/app/dependencies/user.py
- [ ] T024 [US4] Update dependencies __init__.py to export get_current_user instead of get_user_id in backend/app/dependencies/__init__.py
- [ ] T025 [US4] Verify no remaining references to X-User-Id or get_user_id in backend/

**Checkpoint**: X-User-Id header mechanism completely removed - user identity exclusively from JWT

---

## Phase 4: Validation & Security Gate

**Purpose**: Final validation before declaring Phase 2.3 complete

- [ ] T026 Create authentication test fixtures (valid/invalid/expired JWTs) in backend/tests/test_auth.py
- [ ] T027 [P] Test valid JWT returns user's tasks only in backend/tests/test_auth.py
- [ ] T028 [P] Test missing token returns 401 in backend/tests/test_auth.py
- [ ] T029 [P] Test invalid/expired token returns 401 in backend/tests/test_auth.py
- [ ] T030 [P] Test cross-user access returns 403 in backend/tests/test_auth.py
- [ ] T031 [P] Test X-User-Id header alone returns 401 (no longer works) in backend/tests/test_auth.py
- [ ] T032 Verify all acceptance criteria from spec.md pass
- [ ] T033 Run quickstart.md verification checklist

**Checkpoint**: Phase 2.3 complete - all security requirements validated

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS US4
- **User Story 4 (Phase 3)**: Depends on Foundational completion
- **Validation (Phase 4)**: Depends on all implementation complete

### Within Phase 2 (Foundational)

1. **T004-T009**: Authentication dependency MUST be complete first
2. **T010-T016**: Route integration depends on auth dependency
3. **T017-T021**: Cross-user access depends on route integration

### Parallel Opportunities

**Phase 1**:
- T002, T003 can run in parallel after T001

**Phase 2 - Route Integration**:
- T012, T013, T014, T015, T016 can run in parallel after T011

**Phase 2 - Cross-User Access**:
- T019, T020, T021 can run in parallel after T018

**Phase 4 - Tests**:
- T027, T028, T029, T030, T031 can run in parallel after T026

---

## Parallel Example: Route Integration

```bash
# After T011 completes, launch all route updates together:
Task: "Replace get_user_id with get_current_user in list_tasks endpoint"
Task: "Replace get_user_id with get_current_user in get_task endpoint"
Task: "Replace get_user_id with get_current_user in update_task endpoint"
Task: "Replace get_user_id with get_current_user in delete_task endpoint"
Task: "Replace get_user_id with get_current_user in toggle_task_complete endpoint"
```

---

## Implementation Strategy

### MVP First (Foundational Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (US1, US2, US3)
3. **STOP and VALIDATE**: Test authentication works
4. API is now secured with JWT

### Full Implementation

1. Complete Setup → Dependencies ready
2. Complete Foundational → JWT authentication active
3. Complete US4 → Legacy mechanism removed
4. Complete Validation → Phase 2.3 certified complete

---

## Task Summary

| Phase | Task Count | Parallel Opportunities |
|-------|------------|----------------------|
| Phase 1: Setup | 3 | 2 parallel |
| Phase 2: Foundational | 18 | 10 parallel |
| Phase 3: US4 | 4 | 0 parallel |
| Phase 4: Validation | 8 | 5 parallel |
| **Total** | **33** | **17 parallel** |

### Tasks per User Story

| User Story | Priority | Tasks | Description |
|------------|----------|-------|-------------|
| US1 | P1 | T004-T016 | Authenticated Task Access |
| US2 | P1 | T004-T009 | Rejection of Unauthenticated Requests |
| US3 | P1 | T017-T021 | Cross-User Access Prevention |
| US4 | P2 | T022-T025 | X-User-Id Header Removal |

### MVP Scope

**Minimum Viable Secure API**: Complete Phases 1-2 (21 tasks)
- JWT authentication active
- All endpoints secured
- 401 for unauthenticated
- 403 for cross-user access

---

## Success Criteria Mapping

| Spec Criterion | Tasks |
|----------------|-------|
| SC-001: Unauthenticated → 401 | T004-T009, T028, T029 |
| SC-002: Cross-user → 403 | T017-T021, T030 |
| SC-003: Zero data leakage | T010-T016 |
| SC-004: Authenticated access works | T004-T016, T027 |
| SC-005: X-User-Id non-functional | T022-T025, T031 |
| SC-006: API paths unchanged | (No path-changing tasks) |
| SC-007: Consistent error format | T009 |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US1, US2, US3 are tightly coupled - implemented together in Foundational phase
- US4 depends on US1-US3 being complete (can't remove old auth until new auth works)
- Verify tests pass at each checkpoint
- Commit after each task or logical group

---

## Authorization

Successful completion of all Phase 2.3 tasks authorizes:
- **Phase 2.4** — Frontend Integration & UX Polish
