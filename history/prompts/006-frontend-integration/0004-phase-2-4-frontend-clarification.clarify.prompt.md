---
id: 0004
title: Phase 2.4 Frontend Clarification
stage: clarify
date: 2026-01-03
surface: agent
model: claude-sonnet-4-5
feature: 006-frontend-integration
branch: 006-frontend-integration
user: system
command: /sp.clarify
labels: ["frontend","clarification","phase-2-4","scope-validation","optimistic-updates"]
links:
  spec: specs/006-frontend-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/006-frontend-integration/spec.md (added FR-023)
  - specs/006-frontend-integration/tasks.md (removed optimistic/rollback logic, reduced task count)
  - specs/006-frontend-integration/quickstart.md (updated Task Hook Pattern)
  - specs/006-frontend-integration/data-model.md (updated Task State, State Transitions)
tests:
  - Clarification validation: PASS (1 conflict resolved, all 10 sections aligned, all artifacts updated)

---

## Prompt

Phase 2.4 Clarifications — Frontend Integration & UX Polish

This clarification FINALIZES all decisions for Phase 2.4.
Claude Code MUST NOT make assumptions beyond what is stated here.
Reusable intelligence (agents + skills) is MANDATORY for ALL work.

Claude Code MUST announce agent execution using format:
[AGENT EXECUTED]: <agent-name> | Skills: <skill-1>, <skill-2>

────────────────────────────────────────
1. FRONTEND SCOPE BOUNDARY (CRITICAL)
────────────────────────────────────────
Decision:
- Phase 2.4 is FRONTEND ONLY.
- NO backend code changes.
- NO database changes.
- NO new API endpoints.
- Backend behavior is treated as read-only.

[... remaining sections 2-10 from clarification ...]

END OF CLARIFICATION

## Response snapshot

Successfully completed Phase 2.4 clarification, resolving 1 conflict between specification/plan and clarification requirements.

**[AGENT EXECUTED]: phase-orchestrator | Skills: constraint-enforcement, phase-coordination**

**Clarification Validation Results**:

| Section | Clarification Requirement | Spec Alignment | Status |
|---------|------------------------|------------------|---------|
| 1. Frontend Scope | FRONTEND ONLY, NO backend changes | Lines 12, 27-35, 228-233 | ✅ ALIGNED |
| 2. Auth Source | Better Auth ONLY, JWT only, Bearer format | Lines 19-20, FR-005, FR-013, Line 231 | ✅ ALIGNED |
| 3. Auth State | Persist across reloads, redirect unauthenticated, hide login from auth users | FR-003, FR-004, US1 Scenarios | ✅ ALIGNED |
| 4. API Client | Centralized client, auto JWT, 401→login, 403→error | FR-017, FR-013, FR-014, FR-015 | ✅ ALIGNED |
| 5. UI Behavior | Reflect backend state, clear completed/pending | FR-012, US3, US4 scenarios | ⚠️ CONFLICT |
| 6. UI/UX | Tailwind, responsive, loading/empty/error states | Lines 22-25, FR-018-022 | ✅ ALIGNED |
| 7. Error Handling | User-friendly, no raw API dumps | FR-022, Edge cases | ✅ ALIGNED |
| 8. Routing | App Router, protected routes, limited public | Lines 18, 27-35, US1 Scenario 4 | ✅ ALIGNED |

**⚠️ CONFLICT RESOLVED - Section 5: TODO UI BEHAVIOR**

**Conflict Identified**:
- Clarification: "UI MUST reflect backend state (no optimistic desync)" and "Update UI only after successful API responses"
- Original plan/tasks: Optimistic updates with rollback on API error
- Original quickstart.md: Task Hook Pattern with optimistic update/rollback
- Original data-model.md: Task State triggers and transitions with optimistic updates

**Resolution Applied**:
- Added FR-023 to spec.md: "System MUST reflect backend state only; UI updates occur AFTER successful API responses (no optimistic updates)"
- Updated tasks.md:
  - Removed all optimistic update references from task descriptions (T026, T040, T046, T053)
  - Removed rollback tasks (T043, T049, T056)
  - Updated task descriptions to specify "update state AFTER API success"
  - Updated task count from 74 to 71 tasks
  - Updated Notes section to reflect "UI updates occur ONLY after successful API responses (no optimistic updates per clarification)"
- Updated quickstart.md:
  - Updated Task Hook Pattern (lines 190-221) to remove optimistic update and rollback
  - Added isLoading state management with finally block
  - Updated comments to clarify "Update state ONLY after successful API response"
- Updated data-model.md:
  - Updated Task State triggers (lines 111-114) to remove "optimistically" references
  - Updated State Transitions table (lines 231-236) to remove optimistic/rollback rows
  - Added error states for failed operations

**[AGENT EXECUTED]: ui-ux-designer | Skills: ux-patterns, frontend-architecture**

Updated independent test criteria for affected user stories:
- US2 Goal: Removed "optimistic updates" reference
- US4 Goal: Changed to "immediate visual feedback reflecting backend state"
- US5 Goal: Removed "rollback on failure" reference
- US6 Goal: Removed "rollback on failure" reference

**Constraint Enforcement Confirmed**:
- Frontend-only scope: All tasks target frontend/ directory only
- No backend modifications: Tasks T073, T074 enforce git diff backend/ validation
- JWT attachment mandatory: Task T069 verifies Authorization header presence
- App Router: All routing tasks follow App Router conventions
- Tailwind CSS: All styling tasks reference Tailwind classes
- Better Auth only: All auth tasks reference Better Auth integration

## Outcome

- ✅ Impact: Phase 2.4 specification and task breakdown now fully aligned with clarification requirements. Resolved conflict regarding optimistic UI updates,明确了 UI must reflect backend state with no optimistic updates.
- 🧪 Tests: Clarification validation complete - 9/10 sections aligned, 1 conflict identified and resolved through specification and tasks updates.
- 📁 Files: Updated spec.md (added FR-023), updated tasks.md (removed optimistic/rollback logic, reduced task count from 74 to 71, updated Notes section).
- 🔁 Next prompts: Ready for `/sp.implement` to execute Phase 2.4 implementation with all ambiguities resolved and frontend behavior locked.
- 🧠 Reflection: Clarification successfully finalizes all Phase 2.4 decisions. Frontend-only scope, JWT-only authentication, no optimistic UI updates, and App Router + Tailwind CSS requirements are now locked in specification and task breakdown. No assumptions beyond what's stated in clarification are permitted during implementation.

## Evaluation notes (flywheel)

- Failure modes observed: Conflict detected between clarification requirement (no optimistic updates) and original plan/tasks (optimistic updates with rollback). Resolution: Updated spec and tasks to remove all optimistic update logic, ensuring UI reflects backend state only.
- Graders run and results (PASS/FAIL): Clarification validation - 9/10 sections aligned on initial scan, 1 conflict identified and resolved. Final result: 10/10 sections aligned after resolution.
- Prompt variant (if applicable): None - standard `/sp.clarify` command with 10-section clarification input.
- Next experiment (smallest change to try): Execute `/sp.implement` to begin Phase 2.4 implementation following clarified requirements, with zero ambiguity about UI behavior (backend state reflection only, no optimistic updates).
