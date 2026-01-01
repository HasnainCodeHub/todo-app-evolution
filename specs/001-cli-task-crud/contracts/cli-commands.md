# CLI Command Contracts: Task Management Application

**Feature**: 001-cli-task-crud
**Date**: 2026-01-01
**Status**: Complete

## Overview

This document defines the CLI command interface contracts for the Phase I Task Management Application. Since this is a console application (not a REST API), contracts are defined as command-response specifications.

---

## Command Interface

### Application Loop

The application runs an interactive loop displaying a menu of available commands.

```
============================================
         TODO TASK MANAGER
============================================
1. Add Task
2. View Tasks
3. Update Task
4. Delete Task
5. Toggle Complete/Incomplete
6. Exit
============================================
Enter your choice (1-6):
```

---

## Command Specifications

### 1. Add Task

**Command**: Menu option `1`

**Input Flow**:
```
Enter task title: <user input>
Enter task description (optional, press Enter to skip): <user input>
```

**Success Response**:
```
Task added successfully! (ID: <id>)
```

**Error Response** (empty title):
```
Error: Task title cannot be empty.
```

**Validation**:
- Title: Required, must contain non-whitespace characters
- Description: Optional, can be empty

---

### 2. View Tasks

**Command**: Menu option `2`

**Input Flow**: None (no additional input required)

**Success Response** (with tasks):
```
============================================
              YOUR TASKS
============================================
ID: 1 | [ ] Buy groceries
ID: 2 | [x] Call Mom
ID: 3 | [ ] Finish report
============================================
Total: 3 tasks (1 completed, 2 pending)
```

**Success Response** (no tasks):
```
============================================
              YOUR TASKS
============================================
No tasks found. Add a task to get started!
============================================
```

**Display Format**:
- `[ ]` = Pending task
- `[x]` = Completed task

---

### 3. Update Task

**Command**: Menu option `3`

**Input Flow**:
```
Enter task ID to update: <user input>
Enter new title (press Enter to keep current): <user input>
Enter new description (press Enter to keep current): <user input>
```

**Success Response**:
```
Task <id> updated successfully!
```

**Error Response** (invalid ID):
```
Error: Task with ID <id> not found.
```

**Error Response** (non-numeric ID):
```
Error: Please enter a valid numeric ID.
```

**Validation**:
- ID: Required, must be positive integer
- Title: Optional update, empty input preserves current value
- Description: Optional update, empty input preserves current value

---

### 4. Delete Task

**Command**: Menu option `4`

**Input Flow**:
```
Enter task ID to delete: <user input>
```

**Success Response**:
```
Task <id> deleted successfully!
```

**Error Response** (invalid ID):
```
Error: Task with ID <id> not found.
```

**Error Response** (non-numeric ID):
```
Error: Please enter a valid numeric ID.
```

---

### 5. Toggle Complete/Incomplete

**Command**: Menu option `5`

**Input Flow**:
```
Enter task ID to toggle: <user input>
```

**Success Response** (marked complete):
```
Task <id> marked as completed!
```

**Success Response** (marked incomplete):
```
Task <id> marked as pending!
```

**Error Response** (invalid ID):
```
Error: Task with ID <id> not found.
```

**Error Response** (non-numeric ID):
```
Error: Please enter a valid numeric ID.
```

---

### 6. Exit

**Command**: Menu option `6`

**Input Flow**: None

**Response**:
```
Goodbye! Your tasks have not been saved (in-memory storage only).
```

---

## Error Handling Contract

### Invalid Menu Choice

**Trigger**: User enters value outside 1-6 range

**Response**:
```
Error: Invalid choice. Please enter a number between 1 and 6.
```

### Keyboard Interrupt (Ctrl+C)

**Trigger**: User presses Ctrl+C

**Response**:
```
Exiting... Goodbye!
```

---

## Mapping to Functional Requirements

| Command | Requirements Covered |
|---------|---------------------|
| Add Task | FR-001, FR-002, FR-003, FR-004, FR-014 |
| View Tasks | FR-001, FR-005, FR-006, FR-007 |
| Update Task | FR-001, FR-008, FR-009, FR-013 |
| Delete Task | FR-001, FR-010, FR-011, FR-013 |
| Toggle | FR-001, FR-012, FR-013 |
