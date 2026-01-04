---
id: 0002
title: Phase 2.4 Frontend Planning
stage: plan
date: 2026-01-03
surface: agent
model: claude-sonnet-4-5
feature: 006-frontend-integration
branch: 006-frontend-integration
user: system
command: /sp.plan
labels: ["frontend","planning","phase-2-4","nextjs","better-auth"]
links:
  spec: specs/006-frontend-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/006-frontend-integration/plan.md
  - specs/006-frontend-integration/research.md
  - specs/006-frontend-integration/data-model.md
  - specs/006-frontend-integration/quickstart.md
  - CLAUDE.md (updated with TypeScript 5.6+ and frontend technologies)
tests:
  - Constitution Check: Pre-design PASS (11 items), Post-design PASS (4 items)
---

## Prompt

Phase 2.4 Plan — Frontend Integration & UX Polish

This plan defines HOW Phase 2.4 will be executed.
Phase 2.4 integrates the secured backend (Phase 2.3) with a professional, production-grade frontend using Next.js, Better Auth, and Tailwind CSS.

Reusable intelligence (agents + skills) is MANDATORY.
Claude Code MUST announce agent execution using:

[AGENT EXECUTED]: <agent-name> | Skills: <skill-1>, <skill-2>

No implementation may proceed without respecting agent and skill assignments.
────────────────────────────────────────
1. EXECUTION STRATEGY
────────────────────────────────────────

Phase 2.4 will be executed in a frontend-first, integration-safe sequence:

1. Revalidate Phase 2.4 scope and constraints
2. Design frontend architecture (App Router)
3. Design authentication integration (Better Auth)
4. Design API client and JWT attachment
5. Implement Todo UI flows
6. Apply Tailwind-based UX polish
7. Perform final Phase II validation gate

No backend or database changes are permitted.

────────────────────────────────────────
2. SCOPE VALIDATION
────────────────────────────────────────

[AGENT EXECUTED]: phase-orchestrator | Skills: constraint-enforcement, phase-coordination

Action:
- Confirm frontend-only scope
- Confirm no backend code changes
- Confirm no new API endpoints
- Confirm Phase 2.3 authentication is authoritative

────────────────────────────────────────
3. FRONTEND ARCHITECTURE DESIGN
────────────────────────────────────────

[AGENT EXECUTED]: frontend-architect | Skills: nextjs-app-router, frontend-architecture

Action:
- Define App Router structure
- Plan layout hierarchy (root layout, auth layout, app layout)
- Define component boundaries (pages vs components)
- Establish state management approach (React state/hooks)

────────────────────────────────────────
4. AUTHENTICATION INTEGRATION (BETTER AUTH)
────────────────────────────────────────

[AGENT EXECUTED]: authentication-integrator | Skills: better-auth-integration, jwt-client-handling

Action:
- Integrate Better Auth into Next.js frontend
- Configure login and signup flows
- Ensure JWT is issued and accessible
- Persist auth state across reloads

────────────────────────────────────────
5. API CLIENT & JWT ATTACHMENT
────────────────────────────────────────

[AGENT EXECUTED]: frontend-architect | Skills: frontend-architecture, jwt-client-handling

Action:
- Create centralized API client utility
- Attach JWT to Authorization header for ALL requests
- Handle 401/403 responses gracefully
- Ensure no API call bypasses auth

────────────────────────────────────────
6. TODO FEATURE INTEGRATION
────────────────────────────────────────

[AGENT EXECUTED]: frontend-architect | Skills: frontend-architecture, rest-api-integration

Action:
- Integrate backend APIs for:
  - Create task
  - List tasks
  - Update task
  - Toggle completion
  - Delete task
- Ensure all operations reflect real backend state
- No mock data permitted

────────────────────────────────────────
7. UI / UX DESIGN & TAILWIND STYLING
────────────────────────────────────────

[AGENT EXECUTED]: ui-ux-designer | Skills: tailwind-ui-design, ux-patterns

Action:
- Design clean, modern dashboard UI
- Style all components with Tailwind CSS
- Implement responsive layout (mobile + desktop)
- Add loading states, empty states, and visual feedback
- Clearly distinguish completed vs pending tasks

────────────────────────────────────────
8. ERROR HANDLING & USER FEEDBACK
────────────────────────────────────────

[AGENT EXECUTED]: ui-ux-designer | Skills: ux-patterns, frontend-architecture

Action:
- Display friendly error messages
- Handle API failures gracefully
- Disable actions during async requests
- Prevent UI desync with backend state

────────────────────────────────────────
9. FINAL PHASE II VALIDATION GATE
────────────────────────────────────────

[AGENT EXECUTED]: phase-orchestrator | Skills: constraint-enforcement, phase-coordination

Action:
- Verify full end-to-end flow:
  - Signup → Login → Authenticated dashboard
  - All CRUD operations work
- Verify JWT attached to every API request
- Verify backend security remains intact
- Confirm Phase II is COMPLETE

────────────────────────────────────────
10. OUTPUT ARTIFACTS
────────────────────────────────────────

This phase produces:
- Next.js frontend with Better Auth
- Tailwind-styled Todo dashboard
- Authenticated API integration

This phase does NOT produce:
- Backend changes
- Database changes
- AI features

────────────────────────────────────────
AUTHORIZATION
────────────────────────────────────────

Successful completion of Phase 2.4 COMPLETES PHASE II and authorizes:
- Phase III — AI Chatbot (OpenAI Agents SDK + MCP)

END OF PLAN

## Response snapshot

Successfully completed Phase 2.4 planning for Frontend Integration & UX Polish.

**[AGENT EXECUTED]: phase-orchestrator | Skills: constraint-enforcement, phase-coordination**
- Validated frontend-only scope
- Confirmed zero backend modifications
- Confirmed Phase 2.3 authentication as authoritative

**[AGENT EXECUTED]: frontend-architect | Skills: nextjs-app-router, frontend-architecture**
- Defined App Router component structure
- Established component hierarchy (pages vs components)
- Designed component-driven architecture with custom React hooks

**[AGENT EXECUTED]: authentication-integrator | Skills: better-auth-integration, jwt-client-handling**
- Designed Better Auth integration pattern
- Planned JWT token management
- Designed React Context + custom hook approach

**[AGENT EXECUTED]: ui-ux-designer | Skills: tailwind-ui-design, ux-patterns**
- Designed responsive Tailwind CSS approach
- Planned UX polish (loading states, empty states, error messages)

**Architecture Decisions (4 ADRs documented)**:
- AD-1: Component-driven architecture with custom React hooks
- AD-2: Centralized fetch-based API client with JWT interceptor
- AD-3: React Context + custom hook for authentication state
- AD-4: Tailwind CSS with component-scoped classes

**Constitution Check**: All 15 items PASS
- Pre-design: 11/11 PASS
- Post-design: 4/4 PASS (no regressions)

**Project Structure**: Web application (frontend only)
- New frontend codebase under /frontend directory
- Zero modifications to existing backend code

**Implementation Sequence (6 phases)**:
1. Project Setup & Configuration
2. Authentication Integration (Better Auth)
3. API Client & Data Layer
4. Task Management UI
5. UX Polish & Responsive Design
6. Testing & Quality Assurance

## Outcome

- ✅ Impact: Comprehensive plan for Phase 2.4 frontend implementation, defining all architecture decisions, project structure, implementation phases, and security considerations.
- 🧪 Tests: Constitution Check complete (15/15 PASS). No implementation tests in planning phase.
- 📁 Files: Created plan.md (265 lines), research.md (180 lines), data-model.md (280 lines), quickstart.md (200 lines).
- 🔁 Next prompts: Ready for `/sp.tasks` to generate detailed implementation task breakdown.
- 🧠 Reflection: Plan maintains strict frontend-only scope with zero backend modifications. Architecture decisions balance simplicity for Phase 2.4 scope with future scalability. All constitution principles upheld.

## Evaluation notes (flywheel)

- Failure modes observed: None. Planning proceeded smoothly with all constitution checks passing.
- Graders run and results (PASS/FAIL): Constitution Check - 15/15 PASS. All principles upheld.
- Prompt variant (if applicable): None - standard `/sp.plan` command
- Next experiment (smallest change to try): Run `/sp.tasks` to generate task breakdown, then execute Phase 2.4 implementation according to plan
