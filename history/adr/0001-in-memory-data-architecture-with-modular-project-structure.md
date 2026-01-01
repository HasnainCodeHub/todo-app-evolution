# ADR-0001: In-Memory Data Architecture with Modular Project Structure

- **Status:** Accepted
- **Date:** 2026-01-01
- **Feature:** 001-cli-task-crud
- **Context:** Phase I requires a CLI task management application with in-memory storage. We need to decide how to structure the data layer and organize the codebase for maintainability while respecting Phase I constraints (no databases, no persistence).

## Decision

We will use the following integrated data and project architecture:

**Data Layer:**
- Storage: Python list holding Task dataclass instances
- Entity: Task dataclass with id (int), title (str), description (str), completed (bool)
- ID Strategy: Sequential integers starting from 1, never reused after deletion
- State Manager: TaskStore class managing the collection and ID counter

**Project Structure:**
- 4-module separation under src/:
  - `main.py` - Application entry point and main loop
  - `task_model.py` - Task dataclass definition
  - `task_store.py` - In-memory storage operations
  - `cli.py` - User interface handling
- Test structure mirroring src/ under tests/

## Consequences

### Positive

- **Simplicity**: In-memory list requires no external dependencies or configuration
- **Clarity**: 4-module separation provides clear boundaries between concerns
- **Testability**: Each module can be unit tested independently
- **Phase I Compliant**: No databases or persistence mechanisms (constitution requirement)
- **Sequential IDs**: Simple for users to reference tasks by number
- **Non-reused IDs**: Prevents confusion when tasks are deleted and new ones added

### Negative

- **No Persistence**: All data is lost when application exits (expected per spec)
- **O(n) Lookups**: List iteration for find-by-ID operations (acceptable for expected scale <1000 tasks)
- **Memory Bound**: All tasks must fit in memory (acceptable for Phase I scope)
- **ID Gaps**: Deleted task IDs leave gaps in the sequence (cosmetic only)

## Alternatives Considered

**Alternative A: Dictionary-based Storage**
- Store tasks in dict with ID as key for O(1) lookups
- Rejected: List is simpler for iteration/display; O(n) is acceptable for expected scale

**Alternative B: Single File Architecture**
- All code in one main.py file
- Rejected: Violates separation of concerns; harder to test and maintain

**Alternative C: UUID-based Task IDs**
- Use UUIDs instead of sequential integers
- Rejected: Overcomplicated for Phase I; harder for users to type/reference

**Alternative D: Reusing Deleted IDs**
- Track deleted IDs and reuse them for new tasks
- Rejected: Could confuse users if they reference a task ID that now belongs to a different task

## References

- Feature Spec: [specs/001-cli-task-crud/spec.md](../../specs/001-cli-task-crud/spec.md)
- Implementation Plan: [specs/001-cli-task-crud/plan.md](../../specs/001-cli-task-crud/plan.md)
- Related ADRs: None (first ADR)
- Research: [specs/001-cli-task-crud/research.md](../../specs/001-cli-task-crud/research.md)
