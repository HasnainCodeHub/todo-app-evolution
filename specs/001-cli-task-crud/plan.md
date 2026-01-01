# Implementation Plan: CLI Task Management Application

**Branch**: `001-cli-task-crud` | **Date**: 2026-01-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-cli-task-crud/spec.md`

## Summary

This plan describes HOW the Phase I specification will be implemented. The application will be a simple, single-process Python console program with all task data stored in memory for the lifetime of the program. The application runs in an interactive loop, accepting user commands, performing operations on the in-memory task list, and displaying results back to the user.

The design prioritizes clarity, simplicity, and maintainability over abstraction or extensibility.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: Python standard library only (no external runtime dependencies)
**Storage**: In-memory (Python list) - databases FORBIDDEN per constitution
**Testing**: pytest
**Target Platform**: Cross-platform terminal/console
**Project Type**: Single project (console application)
**Performance Goals**: Interactive response (<1 second per operation)
**Constraints**: In-memory only, single-user, no persistence
**Scale/Scope**: Single user, reasonable task count (<1000 tasks)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Requirement | Status |
|------|-------------|--------|
| Language | Python 3.13+ | PASS |
| Package Manager | UV | PASS |
| Data Storage | In-memory only | PASS |
| Interface | CLI only | PASS |
| Databases | FORBIDDEN | PASS (not used) |
| Web Frameworks | FORBIDDEN | PASS (not used) |
| AI/ML | FORBIDDEN | PASS (not used) |
| Spec-Driven | Spec exists before plan | PASS |
| No Manual Coding | Implementation via Claude Code | PASS |

**Result**: All constitution gates PASS. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/001-cli-task-crud/
├── plan.md              # This file
├── research.md          # Phase 0 output (complete)
├── data-model.md        # Phase 1 output (complete)
├── quickstart.md        # Phase 1 output (complete)
├── contracts/           # Phase 1 output (complete)
│   └── cli-commands.md  # CLI command specifications
├── checklists/          # Quality validation
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
src/
├── main.py              # Application entry point and CLI loop
├── task_model.py        # Task dataclass definition
├── task_store.py        # In-memory storage and task operations
└── cli.py               # User input handling and output formatting

tests/
├── test_task_model.py   # Unit tests for Task dataclass
├── test_task_store.py   # Unit tests for TaskStore operations
└── test_cli.py          # Tests for CLI input/output handling
```

**Structure Decision**: Single project structure selected. This aligns with the console application nature and keeps the codebase simple. The separation into four modules (main, model, store, cli) follows the user's plan and provides clean separation of concerns without over-engineering.

## Feature Implementation Strategy

### Add Task (FR-002, FR-003, FR-004, FR-014)
- Prompt user for title and optional description
- Validate title is non-empty and contains non-whitespace
- Create a new task with auto-incremented unique ID
- Store task in memory
- Display confirmation with task ID

### View Tasks (FR-005, FR-006, FR-007)
- Iterate over all stored tasks
- Display ID, title, and completion status
- Use `[ ]` for pending and `[x]` for completed (visual distinction)
- Show summary count of total/completed/pending
- Handle empty list with informative message

### Update Task (FR-008, FR-009, FR-013)
- Prompt user for task ID
- Validate ID exists
- Allow modification of title and/or description (empty input preserves current)
- Preserve task ID and completion status
- Display confirmation

### Delete Task (FR-010, FR-011, FR-013)
- Prompt user for task ID
- Validate ID exists
- Remove task from in-memory storage
- Display confirmation
- Note: Deleted IDs are never reused

### Mark Complete/Incomplete (FR-012, FR-013)
- Prompt user for task ID
- Validate ID exists
- Toggle the completed flag
- Display new status
- Reflect updated status in subsequent views

## Error Handling Strategy

| Error Type | Handling |
|------------|----------|
| Invalid menu choice | Display error, re-prompt for valid choice |
| Invalid task ID (non-numeric) | Display error, return to menu |
| Task not found | Display error with ID, return to menu |
| Empty title | Display error, prompt for valid title |
| Keyboard interrupt (Ctrl+C) | Graceful exit with goodbye message |

## Complexity Tracking

> No constitution violations detected. This section is not required.

## Related Artifacts

- [Specification](./spec.md) - Feature requirements and acceptance criteria
- [Research](./research.md) - Technical decisions and rationale
- [Data Model](./data-model.md) - Entity definitions and storage structure
- [CLI Commands](./contracts/cli-commands.md) - Command interface contracts
- [Quickstart](./quickstart.md) - Setup and usage guide

## Next Steps

This plan is complete and ready for:
1. `/sp.tasks` - Break this plan into atomic, executable tasks
2. `/sp.implement` - Generate the code via Claude Code
