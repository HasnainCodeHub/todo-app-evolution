# Data Model: CLI Task Management Application

**Feature**: 001-cli-task-crud
**Date**: 2026-01-01
**Status**: Complete

## Overview

This document defines the data structures and their relationships for the Phase I CLI Task Management Application. All data is stored in-memory during application runtime.

---

## Entities

### Task

Represents a single todo item managed by the user.

| Field | Type | Required | Default | Immutable | Description |
|-------|------|----------|---------|-----------|-------------|
| id | int | Yes | Auto-generated | Yes | Unique identifier, sequential starting from 1 |
| title | str | Yes | - | No | Task title (non-empty, non-whitespace) |
| description | str | No | "" (empty) | No | Optional task description |
| completed | bool | Yes | False | No | Completion status |

**Validation Rules**:
- `id`: Positive integer, auto-incremented, never reused after deletion
- `title`: Non-empty string, must contain at least one non-whitespace character
- `description`: Any string, including empty string
- `completed`: Boolean, True = "Completed", False = "Pending"

**State Transitions**:
```
[Created] --> Pending (completed=False)
Pending --> Completed (toggle action)
Completed --> Pending (toggle action)
Any State --> [Deleted] (delete action)
```

---

## Storage Structure

### TaskStore

In-memory storage container for all tasks.

| Component | Type | Description |
|-----------|------|-------------|
| tasks | List[Task] | Ordered collection of all active tasks |
| next_id | int | Counter for next task ID (starts at 1) |

**Operations**:

| Operation | Input | Output | Side Effects |
|-----------|-------|--------|--------------|
| add | title, description? | Task | Creates task, increments next_id |
| get_all | - | List[Task] | None |
| get_by_id | id | Task or None | None |
| update | id, title?, description? | Task or None | Modifies task in place |
| delete | id | bool | Removes task from list |
| toggle_complete | id | Task or None | Flips completed flag |

---

## Data Flow Diagram

```
┌─────────────────┐
│   User Input    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   CLI Module    │  ← Parses commands, validates input
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   TaskStore     │  ← Manages in-memory task collection
│  ┌───────────┐  │
│  │ tasks[]   │  │
│  │ next_id   │  │
│  └───────────┘  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Task Model    │  ← Individual task data structure
│  ┌───────────┐  │
│  │ id        │  │
│  │ title     │  │
│  │ description│ │
│  │ completed │  │
│  └───────────┘  │
└─────────────────┘
```

---

## Mapping to Functional Requirements

| Requirement | Data Model Impact |
|-------------|-------------------|
| FR-002 | Task.title (required), Task.description (optional) |
| FR-003 | TaskStore.next_id auto-increments for unique IDs |
| FR-004 | TaskStore.tasks list holds all active tasks |
| FR-006 | Task.completed boolean maps to "Pending"/"Completed" |
| FR-009 | Task.id is immutable, update modifies title/description only |
| FR-011 | TaskStore.delete removes task from tasks list |

---

## Example Data States

### Initial State
```python
TaskStore(tasks=[], next_id=1)
```

### After Adding Two Tasks
```python
TaskStore(
    tasks=[
        Task(id=1, title="Buy groceries", description="", completed=False),
        Task(id=2, title="Call Mom", description="Discuss weekend", completed=False)
    ],
    next_id=3
)
```

### After Completing Task 1
```python
TaskStore(
    tasks=[
        Task(id=1, title="Buy groceries", description="", completed=True),
        Task(id=2, title="Call Mom", description="Discuss weekend", completed=False)
    ],
    next_id=3
)
```

### After Deleting Task 1
```python
TaskStore(
    tasks=[
        Task(id=2, title="Call Mom", description="Discuss weekend", completed=False)
    ],
    next_id=3  # Note: next_id is NOT decremented
)
```
