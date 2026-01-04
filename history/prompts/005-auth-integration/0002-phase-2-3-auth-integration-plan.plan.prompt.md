---
id: "0002"
title: "Phase 2.3 Auth Integration Plan"
stage: plan
date: 2026-01-03
surface: agent
model: claude-opus-4-5-20251101
feature: 005-auth-integration
branch: 005-auth-integration
user: architect
command: /sp.plan
labels: ["authentication", "jwt", "better-auth", "fastapi", "phase-2.3"]
links:
  spec: specs/005-auth-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/005-auth-integration/plan.md
  - specs/005-auth-integration/research.md
  - specs/005-auth-integration/data-model.md
  - specs/005-auth-integration/quickstart.md
  - specs/005-auth-integration/contracts/auth-dependency.md
  - specs/005-auth-integration/contracts/error-responses.md
tests:
  - N/A (planning phase - no tests yet)
---

## Prompt

/sp.plan

Phase 2.3 Plan — Authentication (Better Auth + JWT)

This plan defines HOW Phase 2.3 authentication will be implemented. The objective is to secure existing REST APIs using JWTs issued by Better Auth, without changing API paths, database schema, or frontend UI.

Reusable intelligence (agents + skills) must be used as the primary execution mechanism.

[Full plan outline with 11 sections covering execution strategy, scope validation, authentication architecture design, FastAPI auth dependency design, removal of pre-auth mechanism, user-scoped access enforcement, authentication error handling, environment configuration, validation & security gate, output artifacts, and authorization for next phase]

## Response snapshot

Executed the Phase 2.3 planning workflow following the sp.plan skill structure:

**Phase 0: Research** - Completed research.md with findings on:
- JWT library selection: PyJWT recommended over deprecated python-jose
- Better Auth JWT structure: EdDSA default, HS256 configurable
- FastAPI authentication patterns using OAuth2PasswordBearer
- Error response format alignment with Phase 2.2

**Phase 1: Design** - Generated:
- data-model.md: AuthenticatedUser, JWT payload structures, state transitions
- contracts/auth-dependency.md: get_current_user dependency specification
- contracts/error-responses.md: 401/403 error codes and messages
- quickstart.md: Implementation guide with step-by-step instructions
- plan.md: Full implementation plan with constitution checks, architecture decisions, and implementation sequence

**Key Decisions**:
1. Use PyJWT with HS256 shared secret (simpler than JWKS)
2. Return 403 for cross-user access attempts (not 404)
3. Complete removal of X-User-Id header mechanism

## Outcome

- Impact: Created comprehensive Phase 2.3 implementation plan with all design artifacts
- Tests: N/A (planning phase)
- Files: 6 artifacts created under specs/005-auth-integration/
- Next prompts: /sp.tasks to generate implementation task breakdown
- Reflection: Plan successfully balances security requirements with minimal invasiveness to existing codebase

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Constitution Check PASS (pre-design and post-design)
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed to /sp.tasks for task generation
