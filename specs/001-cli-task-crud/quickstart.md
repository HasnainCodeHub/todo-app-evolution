# Quickstart Guide: CLI Task Management Application

**Feature**: 001-cli-task-crud
**Date**: 2026-01-01

## Prerequisites

- Python 3.13 or higher
- UV package manager

## Installation

1. **Clone and navigate to the project**:
   ```bash
   cd todo-app
   ```

2. **Install dependencies using UV**:
   ```bash
   uv sync
   ```

## Running the Application

```bash
uv run python src/main.py
```

## Quick Usage

Once the application starts, you'll see a menu:

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

### Example Session

```
Enter your choice (1-6): 1
Enter task title: Buy groceries
Enter task description (optional, press Enter to skip): Milk, eggs, bread
Task added successfully! (ID: 1)

Enter your choice (1-6): 1
Enter task title: Call Mom
Enter task description (optional, press Enter to skip):
Task added successfully! (ID: 2)

Enter your choice (1-6): 2
============================================
              YOUR TASKS
============================================
ID: 1 | [ ] Buy groceries
ID: 2 | [ ] Call Mom
============================================
Total: 2 tasks (0 completed, 2 pending)

Enter your choice (1-6): 5
Enter task ID to toggle: 1
Task 1 marked as completed!

Enter your choice (1-6): 2
============================================
              YOUR TASKS
============================================
ID: 1 | [x] Buy groceries
ID: 2 | [ ] Call Mom
============================================
Total: 2 tasks (1 completed, 1 pending)

Enter your choice (1-6): 6
Goodbye! Your tasks have not been saved (in-memory storage only).
```

## Running Tests

```bash
uv run pytest
```

## Important Notes

- **Data is NOT persisted**: All tasks are lost when you exit the application
- **Single user**: This application is designed for single-user usage
- **Sequential IDs**: Task IDs start at 1 and increment; deleted IDs are never reused

## Project Structure

```
src/
├── main.py          # Application entry point
├── task_model.py    # Task data structure
├── task_store.py    # In-memory storage operations
└── cli.py           # User interface handling

tests/
├── test_task_model.py
├── test_task_store.py
└── test_cli.py
```

## Troubleshooting

### "Command not found: uv"
Install UV following the instructions at: https://docs.astral.sh/uv/

### "Python version not supported"
Ensure Python 3.13+ is installed:
```bash
python --version
```

### "Module not found"
Run from the project root directory and ensure dependencies are installed:
```bash
uv sync
```
