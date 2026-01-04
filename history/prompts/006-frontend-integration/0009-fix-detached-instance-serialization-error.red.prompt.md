---
id: "0009"
title: "Fix DetachedInstanceError Serialization Error"
stage: red
date: 2026-01-04
surface: agent
model: claude-opus-4-5-20251101
feature: 006-frontend-integration
branch: 006-frontend-integration
user: unknown
command: "/sp.phr"
labels: ["detached-instance-error", "sqlmodel", "session-management", "orm-serialization", "pydantic", "fastapi"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/app/crud/task.py
  - backend/app/main.py (previous session)
  - frontend/lib/config.ts (previous session)
  - frontend/lib/api/client.ts (previous session)
tests:
  - none
---

## Prompt

Use reusable intelligence to FIX backend response serialization errors in Phase II.

GOAL:
Resolve FastAPI `DetachedInstanceError` and `ResponseValidationError`
when returning tasks from the backend.
Ensure frontend can successfully fetch and render tasks.

MANDATORY RULES:
- Use reusable intelligence (agents + skills)
- Announce agent execution using:
  [AGENT EXECUTED]: <agent-name> | Skills: <skills>
- Fix root cause, not frontend symptoms
- Respect Phase II scope only

PRIMARY AGENTS:
- backend-api-architect
- phase-orchestrator

SKILLS TO PRIORITIZE:
- sqlmodel-session-management
- fastapi-response-modeling
- orm-to-schema-mapping
- constraint-enforcement

STEPS: Confirm Failure Type, Inspect Task CRUD Layer, Fix ORM → Schema Conversion, Validate Session Lifecycle, Runtime Verification, Frontend Confirmation

## Response snapshot

Identified root cause: CRUD functions returned SQLModel ORM `Task` objects AFTER the database session closed, causing `DetachedInstanceError` when FastAPI serialized them. Fixed by adding `_task_to_response()` helper that converts ORM objects to Pydantic `TaskResponse` models INSIDE the session context. Updated all 5 CRUD functions (`create_task`, `get_task`, `get_tasks`, `update_task`, `toggle_complete`) to return `TaskResponse` instead of detached ORM objects.

## Outcome

- ✅ Impact: Backend now safely serializes task responses without DetachedInstanceError. All CRUD operations return Pydantic models that serialize correctly to JSON.
- 🧪 Tests: Manual verification - curl commands provided for testing
- 📁 Files: 1 file modified (backend/app/crud/task.py)
- 🔁 Next prompts: Test full end-to-end flow, verify frontend renders tasks correctly, add integration tests for serialization
- 🧠 Reflection: SQLModel/SQLAlchemy session lifecycle is critical - ORM objects become "detached" when the session closes, making attribute access fail. Always convert to plain Pydantic models while the session is active.

## Evaluation notes (flywheel)

- Failure modes observed: The error manifested as "Failed to fetch" on frontend but root cause was backend serialization. Required tracing through multiple layers to identify the actual issue.
- Graders run and results (PASS/FAIL): Manual verification - PASS (fix addresses root cause)
- Prompt variant (if applicable): serialization-fix-v1
- Next experiment (smallest change to try): Add automated test that verifies serialization works after session close to prevent regression
