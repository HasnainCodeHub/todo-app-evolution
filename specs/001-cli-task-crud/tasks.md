# Tasks: CLI Task Management Application

**Input**: Design documents from `/specs/001-cli-task-crud/`
**Prerequisites**: plan.md (complete), spec.md (complete), data-model.md (complete), contracts/cli-commands.md (complete)

**Tests**: Not explicitly requested in spec. Tests will be added in Polish phase if time permits.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root (per plan.md)

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create clean project skeleton matching approved plan structure

- [x] T001 Create src/ directory structure at repository root
- [x] T002 Create empty src/__init__.py for Python package
- [x] T003 [P] Create pyproject.toml with Python 3.13+ requirement and UV configuration
- [x] T004 [P] Create empty src/main.py entry point file
- [x] T005 [P] Create empty src/task_model.py file
- [x] T006 [P] Create empty src/task_store.py file
- [x] T007 [P] Create empty src/cli.py file

**Checkpoint**: Project skeleton exists, ready for implementation

---

## Phase 2: Foundational (Domain & Storage Layer)

**Purpose**: Core data model and storage that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T008 Define Task dataclass with id, title, description, completed fields in src/task_model.py
- [x] T009 Implement TaskStore class with tasks list and next_id counter in src/task_store.py
- [x] T010 Implement TaskStore.add() method - creates task with auto-incremented ID in src/task_store.py
- [x] T011 [P] Implement TaskStore.get_all() method - returns list of all tasks in src/task_store.py
- [x] T012 [P] Implement TaskStore.get_by_id() method - finds task by ID or returns None in src/task_store.py

**Checkpoint**: Foundation ready - Task model and basic storage operations complete

---

## Phase 3: User Story 1 - Add New Task (Priority: P1) 🎯 MVP

**Goal**: User can add a new task by providing a title and optional description. System assigns unique ID and stores in memory.

**Independent Test**: Run app, add task with title "Buy groceries", verify task appears with ID and "Pending" status.

**Acceptance Criteria**:
- Title with description creates task
- Title alone creates task with empty description
- Empty/whitespace title shows error

### Implementation for User Story 1

- [x] T013 [US1] Create display_menu() function showing numbered options in src/cli.py
- [x] T014 [US1] Create get_user_choice() function for menu input in src/cli.py
- [x] T015 [US1] Create prompt_for_title() function with validation (non-empty, non-whitespace) in src/cli.py
- [x] T016 [US1] Create prompt_for_description() function (optional, Enter to skip) in src/cli.py
- [x] T017 [US1] Implement add_task_command() function - prompts for title/description, calls TaskStore.add(), displays confirmation in src/cli.py
- [x] T018 [US1] Create main application loop skeleton in src/main.py - displays menu, gets choice, routes to handlers
- [x] T019 [US1] Wire menu option 1 to add_task_command() in src/main.py
- [x] T020 [US1] Implement graceful exit on option 6 with goodbye message in src/main.py

**Checkpoint**: User can add tasks via menu. This is the MVP - can demo adding tasks!

---

## Phase 4: User Story 2 - View All Tasks (Priority: P1)

**Goal**: User can see all tasks with ID, title, and completion status. Empty list shows helpful message.

**Independent Test**: Add 2-3 tasks, select View, verify all tasks display with correct format and status markers.

**Acceptance Criteria**:
- Tasks display with ID, status marker [ ]/[x], and title
- Empty list shows "No tasks found" message
- Summary shows total/completed/pending counts

### Implementation for User Story 2

- [x] T021 [US2] Create format_task_display() function - formats single task as "ID: N | [ ] Title" in src/cli.py
- [x] T022 [US2] Implement view_tasks_command() function - retrieves all tasks, displays formatted list or empty message in src/cli.py
- [x] T023 [US2] Add task count summary (total, completed, pending) to view output in src/cli.py
- [x] T024 [US2] Wire menu option 2 to view_tasks_command() in src/main.py

**Checkpoint**: User can add AND view tasks. Combined with US1, this forms functional MVP!

---

## Phase 5: User Story 3 - Mark Task Complete/Incomplete (Priority: P2)

**Goal**: User can toggle task completion status. Completed tasks show [x] marker.

**Independent Test**: Add task, toggle to complete, view to confirm [x] marker, toggle again, confirm [ ] marker.

**Acceptance Criteria**:
- Toggle changes Pending to Completed and vice versa
- Non-existent ID shows error message
- Invalid ID format shows error message

### Implementation for User Story 3

- [x] T025 [US3] Implement TaskStore.toggle_complete() method - flips completed flag in src/task_store.py
- [x] T026 [US3] Create prompt_for_task_id() function with numeric validation in src/cli.py
- [x] T027 [US3] Implement toggle_complete_command() function - prompts for ID, calls toggle, displays new status or error in src/cli.py
- [x] T028 [US3] Wire menu option 5 to toggle_complete_command() in src/main.py

**Checkpoint**: User can add, view, and toggle completion. Core task management complete!

---

## Phase 6: User Story 4 - Update Task Details (Priority: P3)

**Goal**: User can modify task title and/or description. ID remains unchanged.

**Independent Test**: Add task, update title, view to confirm change. Update description only, confirm title preserved.

**Acceptance Criteria**:
- Empty input for title/description preserves current value
- Task ID remains unchanged after update
- Non-existent ID shows error message

### Implementation for User Story 4

- [x] T029 [US4] Implement TaskStore.update() method - updates title and/or description in src/task_store.py
- [x] T030 [US4] Create prompt_for_new_title() function (Enter to keep current) in src/cli.py
- [x] T031 [US4] Create prompt_for_new_description() function (Enter to keep current) in src/cli.py
- [x] T032 [US4] Implement update_task_command() function - prompts for ID, shows current values, allows updates in src/cli.py
- [x] T033 [US4] Wire menu option 3 to update_task_command() in src/main.py

**Checkpoint**: User can update tasks. All CRUD operations except Delete now work!

---

## Phase 7: User Story 5 - Delete Task (Priority: P3)

**Goal**: User can permanently remove task from memory. Deleted IDs are never reused.

**Independent Test**: Add task (ID 1), delete it, add another task, confirm new task gets ID 2 (not 1).

**Acceptance Criteria**:
- Deleted task no longer appears in view
- Non-existent ID shows error message
- New tasks get new IDs (not deleted ones)

### Implementation for User Story 5

- [x] T034 [US5] Implement TaskStore.delete() method - removes task from list in src/task_store.py
- [x] T035 [US5] Implement delete_task_command() function - prompts for ID, calls delete, displays confirmation or error in src/cli.py
- [x] T036 [US5] Wire menu option 4 to delete_task_command() in src/main.py

**Checkpoint**: All 5 user stories complete. Full CRUD + toggle functionality!

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Error handling refinement and final validation

- [x] T037 Implement invalid menu choice handling with error message in src/main.py
- [x] T038 Implement keyboard interrupt (Ctrl+C) graceful exit in src/main.py
- [x] T039 Add menu header/separator ASCII art for visual clarity in src/cli.py
- [x] T040 Validate all 5 features work per acceptance scenarios in spec.md
- [x] T041 Verify in-memory only behavior (restart loses data)
- [x] T042 Run quickstart.md example session to validate end-to-end

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) → Phase 2 (Foundational) → User Stories → Phase 8 (Polish)
                                          ↓
                          ┌───────────────┼───────────────┐
                          ↓               ↓               ↓
                       US1 (P1) ──→ US2 (P1) ──→ US3 (P2)
                                                    ↓
                                              ┌─────┴─────┐
                                              ↓           ↓
                                           US4 (P3)    US5 (P3)
```

### User Story Dependencies

| Story | Depends On | Can Start After |
|-------|------------|-----------------|
| US1 (Add) | Phase 2 | Foundational complete |
| US2 (View) | Phase 2, US1 CLI setup | T020 complete |
| US3 (Toggle) | Phase 2 | Foundational complete |
| US4 (Update) | Phase 2 | Foundational complete |
| US5 (Delete) | Phase 2 | Foundational complete |

**Note**: US2 depends on US1's CLI/menu setup. US3-US5 can technically parallelize after Phase 2, but sequential execution is recommended for this single-developer project.

### Within Each User Story

1. TaskStore methods before CLI commands
2. CLI helper functions before command implementations
3. Command implementation before main.py wiring

### Parallel Opportunities

**Phase 1**: T003, T004, T005, T006, T007 can run in parallel (different files)
**Phase 2**: T011, T012 can run in parallel (independent methods)

---

## Parallel Example: Phase 1 Setup

```bash
# Launch all file creation tasks together:
Task: "Create pyproject.toml with Python 3.13+ requirement"
Task: "Create empty src/main.py entry point file"
Task: "Create empty src/task_model.py file"
Task: "Create empty src/task_store.py file"
Task: "Create empty src/cli.py file"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Add Task)
4. Complete Phase 4: User Story 2 (View Tasks)
5. **STOP and VALIDATE**: Can add and view tasks
6. Demo if needed - this is a functional MVP!

### Full Implementation

1. Setup → Foundational → Foundation ready
2. US1 (Add) → Can add tasks
3. US2 (View) → Can view tasks → **MVP Complete**
4. US3 (Toggle) → Can mark complete/incomplete
5. US4 (Update) → Can modify tasks
6. US5 (Delete) → Can remove tasks → **All features complete**
7. Polish → Error handling refined → **Phase I Complete**

---

## Task Summary

| Phase | Task Count | User Story |
|-------|------------|------------|
| Setup | 7 | - |
| Foundational | 5 | - |
| US1 (Add) | 8 | P1 |
| US2 (View) | 4 | P1 |
| US3 (Toggle) | 4 | P2 |
| US4 (Update) | 5 | P3 |
| US5 (Delete) | 3 | P3 |
| Polish | 6 | - |
| **TOTAL** | **42** | 5 stories |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All tasks map to user-provided Phase I task breakdown
- Tasks MUST be executed in order per constitution requirements
