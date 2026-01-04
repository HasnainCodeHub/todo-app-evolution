# Tasks: Phase 2.4 Frontend Integration & UX Polish

**Input**: Design documents from `/specs/006-frontend-integration/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Tests are OPTIONAL - specification does not explicitly request TDD approach.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend project**: `frontend/app/`, `frontend/components/`, `frontend/lib/`, `frontend/hooks/`
- Paths follow Next.js App Router conventions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create frontend directory structure at frontend/
- [ ] T002 Initialize Next.js 14+ project with TypeScript in frontend/
- [ ] T003 [P] Install Better Auth package in frontend/
- [ ] T004 [P] Install Tailwind CSS and dependencies in frontend/
- [ ] T005 [P] Create environment file template frontend/.env.example
- [ ] T006 [P] Configure TypeScript with strict mode in frontend/tsconfig.json
- [ ] T007 Configure Tailwind CSS in frontend/tailwind.config.ts

**Checkpoint**: Frontend project structure and dependencies ready

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 Create TypeScript type definitions in frontend/types/task.ts (User, Task, AuthState, API models)
- [ ] T009 Create centralized API client with JWT interceptor in frontend/lib/api/client.ts
- [ ] T010 [P] Create custom useAuth hook in frontend/hooks/useAuth.ts
- [ ] T011 [P] Create custom useTasks hook in frontend/hooks/useTasks.ts
- [ ] T012 Create AuthProvider React Context in frontend/components/auth/AuthProvider.tsx
- [ ] T013 Create reusable UI components in frontend/components/ui/ (Button.tsx, Input.tsx, Card.tsx, LoadingSpinner.tsx, EmptyState.tsx)
- [ ] T014 Create environment configuration in frontend/lib/config.ts
- [ ] T015 [P] Create middleware for route protection in frontend/middleware.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: Users can sign up, sign in, and maintain authenticated session across page reloads

**Independent Test**: Access application without being logged in, attempt to sign up with valid credentials, verify automatic sign-in, refresh page, verify session persists, sign out, verify redirect to landing page

### Implementation for User Story 1

- [ ] T016 [US1] Configure Better Auth instance in frontend/auth.config.ts
- [ ] T017 [US1] Create sign-in page with sign-up form in frontend/app/signin/page.tsx
- [ ] T018 [US1] Create landing page in frontend/app/page.tsx with links to sign-in
- [ ] T019 [US1] Wrap app root with AuthProvider in frontend/app/layout.tsx
- [ ] T020 [US1] Implement sign-up flow using Better Auth in frontend/app/signin/page.tsx
- [ ] T021 [US1] Implement sign-in flow using Better Auth in frontend/app/signin/page.tsx
- [ ] T022 [US1] Implement sign-out functionality in frontend/components/auth/AuthProvider.tsx
- [ ] T023 [US1] Configure middleware to redirect unauthenticated users in frontend/middleware.ts
- [ ] T024 [US1] Test session persistence across page reloads in frontend/hooks/useAuth.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently - users can sign up, sign in, and maintain session

---

## Phase 4: User Story 2 - Task Creation (Priority: P1)

**Goal**: Authenticated users can create new tasks with required title and optional description

**Independent Test**: Sign in, create task with title only, verify it appears in list, create task with title and description, verify both appear, attempt empty submission, verify validation prevents it

### Implementation for User Story 2

- [ ] T025 [P] [US2] Create TaskForm component in frontend/components/tasks/TaskForm.tsx
- [ ] T026 [US2] Create API endpoint wrapper for POST /api/tasks in frontend/lib/api/client.ts
- [ ] T027 [US2] Implement task creation in useTasks hook (update state AFTER API success) in frontend/hooks/useTasks.ts
- [ ] T028 [US2] Add form validation for required title in frontend/components/tasks/TaskForm.tsx
- [ ] T029 [US2] Display error messages on API failures in frontend/components/tasks/TaskForm.tsx
- [ ] T030 [US2] Disable form submission during async request in frontend/components/tasks/TaskForm.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - users can authenticate and create tasks

---

## Phase 5: User Story 3 - Task Listing & Viewing (Priority: P1)

**Goal**: Authenticated users can view all their tasks with visual distinction between completed and pending tasks, including loading and empty states

**Independent Test**: Sign in, create multiple tasks (some completed, some pending), verify all display correctly, verify completed tasks visually distinct, refresh page, verify tasks persist, delete all tasks, verify empty state displays

### Implementation for User Story 3

- [ ] T031 [P] [US3] Create TaskList component in frontend/components/tasks/TaskList.tsx
- [ ] T032 [P] [US3] Create TaskItem component in frontend/components/tasks/TaskItem.tsx
- [ ] T033 [US3] Create API endpoint wrapper for GET /api/tasks in frontend/lib/api/client.ts
- [ ] T034 [US3] Implement task fetching in useTasks hook in frontend/hooks/useTasks.ts
- [ ] T035 [US3] Add loading state display in frontend/components/tasks/TaskList.tsx
- [ ] T036 [US3] Add empty state display when no tasks exist in frontend/components/tasks/TaskList.tsx
- [ ] T037 [US3] Style completed vs pending tasks distinctly in frontend/components/tasks/TaskItem.tsx
- [ ] T038 [US3] Create protected dashboard page with task list in frontend/app/dashboard/page.tsx

**Checkpoint**: All user stories should now be independently functional - users can authenticate, create tasks, and view their complete task list

---

## Phase 6: User Story 4 - Task Completion (Priority: P1)

**Goal**: Authenticated users can toggle task completion status with immediate visual feedback reflecting backend state

**Independent Test**: Create pending task, click completion toggle, verify immediate visual update to completed status, verify API completes successfully, click toggle again, verify returns to pending state

### Implementation for User Story 4

- [ ] T039 [P] [US4] Create API endpoint wrapper for PATCH /api/tasks/{id}/complete in frontend/lib/api/client.ts
- [ ] T040 [US4] Implement task completion toggle in useTasks hook (update state AFTER API success) in frontend/hooks/useTasks.ts
- [ ] T041 [US4] Add completion toggle button to TaskItem component in frontend/components/tasks/TaskItem.tsx
- [ ] T042 [US4] Disable toggle during async request in frontend/components/tasks/TaskItem.tsx

**Checkpoint**: User can mark tasks complete/incomplete with visual feedback

---

## Phase 7: User Story 5 - Task Editing (Priority: P2)

**Goal**: Authenticated users can update task title and description with proper error handling

**Independent Test**: Create task, click edit, modify title/description, save, verify changes persist, attempt edit with network error, verify original data retained

### Implementation for User Story 5

- [ ] T044 [P] [US5] Create EditTaskForm modal component in frontend/components/tasks/EditTaskForm.tsx
- [ ] T045 [P] [US5] Create API endpoint wrapper for PUT /api/tasks/{id} in frontend/lib/api/client.ts
- [ ] T046 [US5] Implement task update in useTasks hook (update state AFTER API success) in frontend/hooks/useTasks.ts
- [ ] T047 [US5] Add edit button to TaskItem component in frontend/components/tasks/TaskItem.tsx
- [ ] T048 [US5] Integrate EditTaskForm modal in frontend/components/tasks/TaskItem.tsx
- [ ] T049 [US5] Implement cancel edit without saving in frontend/components/tasks/EditTaskForm.tsx

**Checkpoint**: User can edit task details with proper error handling

---

## Phase 8: User Story 6 - Task Deletion (Priority: P2)

**Goal**: Authenticated users can delete tasks with confirmation dialog and proper error handling

**Independent Test**: Create task, click delete, confirm, verify task removed from list, attempt deletion during network error, verify task remains

### Implementation for User Story 6

- [ ] T051 [P] [US6] Create confirmation dialog component in frontend/components/ui/ConfirmDialog.tsx
- [ ] T052 [P] [US6] Create API endpoint wrapper for DELETE /api/tasks/{id} in frontend/lib/api/client.ts
- [ ] T053 [US6] Implement task deletion in useTasks hook (update state AFTER API success) in frontend/hooks/useTasks.ts
- [ ] T054 [US6] Add delete button to TaskItem component in frontend/components/tasks/TaskItem.tsx
- [ ] T055 [US6] Integrate confirmation dialog in frontend/components/tasks/TaskItem.tsx

**Checkpoint**: User can delete tasks with confirmation and proper error handling

---

## Phase 9: User Story 7 - Responsive Design (Priority: P2)

**Goal**: Application interface adapts seamlessly to desktop, tablet, and mobile screen sizes without horizontal scrolling or touch target issues

**Independent Test**: Access application on desktop (1920px+), tablet (768px-1023px), mobile (<768px), verify no horizontal scroll, verify all touch targets >=44px, verify layout adapts appropriately

### Implementation for User Story 7

- [ ] T057 [P] [US7] Design responsive grid layout for dashboard in frontend/app/dashboard/page.tsx (desktop: 2-3 columns, tablet: 2 columns, mobile: 1 column)
- [ ] T058 [P] [US7] Make TaskForm responsive in frontend/components/tasks/TaskForm.tsx (full width on mobile, constrained on desktop)
- [ ] T059 [P] [US7] Make TaskList responsive in frontend/components/tasks/TaskList.tsx (scrollable single column on mobile, grid on desktop)
- [ ] T060 [P] [US7] Ensure touch targets >=44px in frontend/components/tasks/TaskItem.tsx
- [ ] T061 [P] [US7] Apply Tailwind responsive breakpoints to all components (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- [ ] T062 [US7] Test and fix horizontal scrolling issues across breakpoints in frontend/app/dashboard/page.tsx

**Checkpoint**: Application is fully responsive across all device types

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and overall quality

- [ ] T063 [P] Add error toast/notification system for user-friendly error messages in frontend/components/ui/Toast.tsx
- [ ] T064 [P] Add loading indicators to all async operations (button spinners, skeleton screens) in frontend/components/ui/LoadingSpinner.tsx
- [ ] T065 [P] Improve error messages with context (e.g., "Failed to save task - please try again") across all components
- [ ] T066 [P] Add keyboard accessibility (Tab navigation, Enter/Space for actions) to all interactive components
- [ ] T067 [P] Add ARIA labels for screen readers to all interactive elements
- [ ] T068 Test responsive design on actual devices or browser dev tools device emulation
- [ ] T069 Verify all API requests include JWT token in Authorization header (check browser network tab)
- [ ] T070 Verify 401/403 responses trigger redirect to login
- [ ] T071 Verify UI updates only occur after successful API responses (no optimistic updates)
- [ ] T072 Run quickstart.md validation checklist from specs/006-frontend-integration/quickstart.md
- [ ] T073 Verify no backend code changes (git diff backend/ should show zero changes)
- [ ] T074 Verify all Phase 2.3 security checks remain intact

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 US1-US4 → P2 US5-US7)
- **Polish (Phase 10)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Integrates with US1 (authentication) but independently testable
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Integrates with US2 (displays created tasks) but independently testable
- **User Story 4 (P1)**: Can start after Foundational (Phase 2) - Integrates with US3 (toggles displayed tasks) but independently testable
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - Integrates with US3 (edits displayed tasks) but independently testable
- **User Story 6 (P2)**: Can start after Foundational (Phase 2) - Integrates with US3 (deletes displayed tasks) but independently testable
- **User Story 7 (P2)**: Can start after Foundational (Phase 2) - Applies to all stories but independently testable

### Within Each User Story

- UI components can be created in parallel (marked [P])
- API wrappers can be created in parallel (marked [P])
- Hook implementations depend on API wrappers
- Component integration depends on hooks
- Error handling/rollback logic completes the story
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] (T003, T004, T005, T006, T007) can run in parallel
- All Foundational tasks marked [P] (T010, T011, T013, T014, T015) can run in parallel
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All UI components within a story marked [P] can run in parallel
- All API wrappers within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: Foundational Phase

```bash
# Launch all foundational parallel tasks together:
Task: "Create custom useAuth hook in frontend/hooks/useAuth.ts"
Task: "Create custom useTasks hook in frontend/hooks/useTasks.ts"
Task: "Create reusable UI components in frontend/components/ui/"
Task: "Create environment configuration in frontend/lib/config.ts"
Task: "Create middleware for route protection in frontend/middleware.ts"
```

---

## Parallel Example: User Story 2 (Task Creation)

```bash
# Launch all parallel tasks for US2 together:
Task: "Create TaskForm component in frontend/components/tasks/TaskForm.tsx"
Task: "Create API endpoint wrapper for POST /api/tasks in frontend/lib/api/client.ts"
```

---

## Parallel Example: User Story 7 (Responsive Design)

```bash
# Launch all responsive design tasks in parallel:
Task: "Design responsive grid layout for dashboard in frontend/app/dashboard/page.tsx"
Task: "Make TaskForm responsive in frontend/components/tasks/TaskForm.tsx"
Task: "Make TaskList responsive in frontend/components/tasks/TaskList.tsx"
Task: "Ensure touch targets >=44px in frontend/components/tasks/TaskItem.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1-4 Only, P1 Stories)

1. Complete Phase 1: Setup (T001-T007)
2. Complete Phase 2: Foundational (T008-T015) - CRITICAL - blocks all stories
3. Complete Phase 3: User Story 1 - Authentication (T016-T024)
4. Complete Phase 4: User Story 2 - Task Creation (T025-T030)
5. Complete Phase 5: User Story 3 - Task Listing (T031-T038)
6. Complete Phase 6: User Story 4 - Task Completion (T039-T043)
7. **STOP AND VALIDATE**: Test all P1 stories independently
   - Sign up/sign in flow
   - Create task
   - View task list
   - Mark tasks complete
8. Deploy/demo if ready (MVP with full CRUD functionality)

### Incremental Delivery (All Stories)

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Authentication) → Test independently → Deploy/Demo (Can users sign in?)
3. Add User Story 2 (Task Creation) → Test independently → Deploy/Demo (Can users create tasks?)
4. Add User Story 3 (Task Listing) → Test independently → Deploy/Demo (Can users see tasks?)
5. Add User Story 4 (Task Completion) → Test independently → Deploy/Demo (Can users complete tasks?)
6. Add User Story 5 (Task Editing) → Test independently → Deploy/Demo (Can users edit tasks?)
7. Add User Story 6 (Task Deletion) → Test independently → Deploy/Demo (Can users delete tasks?)
8. Add User Story 7 (Responsive Design) → Test independently → Deploy/Demo (Works on mobile?)
9. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (Phase 1-2)
2. Once Foundational is done:
   - Developer A: User Story 1 (Authentication) - Phase 3
   - Developer B: User Story 2 (Task Creation) - Phase 4
   - Developer C: User Story 3 (Task Listing) - Phase 5
3. After P1 stories complete:
   - Developer A: User Story 5 (Task Editing) - Phase 7
   - Developer B: User Story 6 (Task Deletion) - Phase 8
   - Developer C: User Story 7 (Responsive Design) - Phase 9
4. Stories complete and integrate independently
5. All developers work on Phase 10 (Polish) together

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No tests included in this task breakdown - specification does not explicitly request TDD
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Verify no backend changes throughout implementation (git diff backend/)
- JWT token attachment is critical - verify in browser network tab
- UI updates occur ONLY after successful API responses (no optimistic updates per clarification)
- Loading indicators provide perceived performance while awaiting backend response
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence, backend modifications, optimistic UI updates

---

## Agent & Skill Assignments

All tasks in this phase MUST use reusable intelligence as specified in plan.md:

### Primary Agents

- **phase-orchestrator**: Coordinates phase transitions, validates scope constraints, ensures zero backend changes
- **frontend-architect**: Designs and implements frontend architecture, components, and hooks
- **ui-ux-designer**: Designs responsive layouts, styling, loading states, and user feedback
- **authentication-integrator**: Implements Better Auth integration and JWT token management

### Skills Exercised

- **nextjs-app-router**: App Router structure, middleware, routing
- **frontend-architecture**: Component-driven design, custom hooks, state management
- **tailwind-ui-design**: Responsive design, utility classes, styling
- **better-auth-integration**: Sign up/sign in flows, session persistence
- **jwt-client-handling**: Token attachment to API requests, 401/403 handling
- **constraint-enforcement**: No backend changes, no API modifications
- **phase-coordination**: Phase sequencing, validation gates, checkpoint verification

### Agent Execution Pattern

**[AGENT EXECUTED]: <agent-name> | Skills: <skill-1>, <skill-2>**

Examples:
- [AGENT EXECUTED]: phase-orchestrator | Skills: constraint-enforcement, phase-coordination
- [AGENT EXECUTED]: frontend-architect | Skills: nextjs-app-router, frontend-architecture
- [AGENT EXECUTED]: ui-ux-designer | Skills: tailwind-ui-design, ux-patterns
- [AGENT EXECUTED]: authentication-integrator | Skills: better-auth-integration, jwt-client-handling

No implementation may proceed without respecting agent and skill assignments.
