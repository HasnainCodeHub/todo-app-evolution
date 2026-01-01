# Task ID: T007, T013, T014, T015, T016, T017, T021, T022, T023, T026, T027, T030, T031, T032, T035
# CLI Task Management Application - Phase I
# User input handling and output formatting

from src.task_model import Task
from src.task_store import TaskStore


def display_menu() -> None:
    """
    Task ID: T013
    Display the main menu with numbered options.
    """
    print("\n" + "=" * 40)
    print("       TODO APP - Task Manager")
    print("=" * 40)
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Update Task")
    print("4. Delete Task")
    print("5. Toggle Complete")
    print("6. Exit")
    print("-" * 40)


def get_user_choice() -> str:
    """
    Task ID: T014
    Get menu selection from user.

    Returns:
        User's menu choice as string
    """
    return input("Enter your choice (1-6): ").strip()


def prompt_for_title() -> str | None:
    """
    Task ID: T015
    Prompt user for task title with validation.

    Returns:
        Valid title string, or None if user provides empty/whitespace input
    """
    title = input("Enter task title: ").strip()
    if not title:
        print("Error: Title cannot be empty.")
        return None
    return title


def prompt_for_description() -> str:
    """
    Task ID: T016
    Prompt user for optional task description.

    Returns:
        Description string (may be empty if user presses Enter)
    """
    description = input("Enter description (press Enter to skip): ").strip()
    return description


def add_task_command(store: TaskStore) -> None:
    """
    Task ID: T017
    Handle the Add Task command.

    Prompts for title and description, creates task, displays confirmation.

    Args:
        store: The TaskStore instance to add the task to
    """
    print("\n--- Add New Task ---")

    title = prompt_for_title()
    if title is None:
        return

    description = prompt_for_description()

    task = store.add(title, description)
    print(f"\nTask added successfully!")
    print(f"ID: {task.id} | Title: {task.title} | Status: Pending")


def format_task_display(task: Task) -> str:
    """
    Task ID: T021
    Format a single task for display.

    Args:
        task: The Task object to format

    Returns:
        Formatted string like "ID: 1 | [x] Buy groceries"
    """
    status_marker = "[x]" if task.completed else "[ ]"
    return f"ID: {task.id} | {status_marker} {task.title}"


def view_tasks_command(store: TaskStore) -> None:
    """
    Task ID: T022, T023
    Handle the View Tasks command.

    Displays all tasks with ID, status marker, and title.
    Shows summary counts and empty message if no tasks.

    Args:
        store: The TaskStore instance to read from
    """
    print("\n--- All Tasks ---")

    tasks = store.get_all()

    if not tasks:
        print("No tasks found. Add a task to get started!")
        return

    for task in tasks:
        print(format_task_display(task))

    # Task ID: T023 - Add task count summary
    total = len(tasks)
    completed = sum(1 for t in tasks if t.completed)
    pending = total - completed

    print("-" * 30)
    print(f"Total: {total} | Completed: {completed} | Pending: {pending}")


def prompt_for_task_id() -> int | None:
    """
    Task ID: T026
    Prompt user for task ID with numeric validation.

    Returns:
        Valid task ID as integer, or None if invalid input
    """
    user_input = input("Enter task ID: ").strip()
    try:
        task_id = int(user_input)
        if task_id <= 0:
            print("Error: Task ID must be a positive number.")
            return None
        return task_id
    except ValueError:
        print("Error: Invalid task ID. Please enter a number.")
        return None


def toggle_complete_command(store: TaskStore) -> None:
    """
    Task ID: T027
    Handle the Toggle Complete command.

    Prompts for task ID, toggles completion status, displays result.

    Args:
        store: The TaskStore instance to modify
    """
    print("\n--- Toggle Task Completion ---")

    task_id = prompt_for_task_id()
    if task_id is None:
        return

    task = store.toggle_complete(task_id)
    if task:
        status = "Completed" if task.completed else "Pending"
        print(f"\nTask {task_id} is now: {status}")
    else:
        print(f"\nError: Task with ID {task_id} not found.")


def prompt_for_new_title(current_title: str) -> str | None:
    """
    Task ID: T030
    Prompt user for new title, allowing skip to keep current.

    Args:
        current_title: The current task title to display

    Returns:
        New title if provided, None to keep current
    """
    print(f"Current title: {current_title}")
    new_title = input("Enter new title (press Enter to keep current): ").strip()
    if not new_title:
        return None
    return new_title


def prompt_for_new_description(current_description: str) -> str | None:
    """
    Task ID: T031
    Prompt user for new description, allowing skip to keep current.

    Args:
        current_description: The current task description to display

    Returns:
        New description if provided, None to keep current
    """
    display_desc = current_description if current_description else "(empty)"
    print(f"Current description: {display_desc}")
    new_desc = input("Enter new description (press Enter to keep current): ").strip()
    if not new_desc:
        return None
    return new_desc


def update_task_command(store: TaskStore) -> None:
    """
    Task ID: T032
    Handle the Update Task command.

    Prompts for task ID, shows current values, allows updating title/description.

    Args:
        store: The TaskStore instance to modify
    """
    print("\n--- Update Task ---")

    task_id = prompt_for_task_id()
    if task_id is None:
        return

    task = store.get_by_id(task_id)
    if not task:
        print(f"\nError: Task with ID {task_id} not found.")
        return

    print(f"\nUpdating Task {task_id}:")

    new_title = prompt_for_new_title(task.title)
    new_description = prompt_for_new_description(task.description)

    if new_title is None and new_description is None:
        print("\nNo changes made.")
        return

    store.update(task_id, title=new_title, description=new_description)
    print(f"\nTask {task_id} updated successfully!")


def delete_task_command(store: TaskStore) -> None:
    """
    Task ID: T035
    Handle the Delete Task command.

    Prompts for task ID, deletes task, displays confirmation or error.

    Args:
        store: The TaskStore instance to modify
    """
    print("\n--- Delete Task ---")

    task_id = prompt_for_task_id()
    if task_id is None:
        return

    if store.delete(task_id):
        print(f"\nTask {task_id} deleted successfully!")
    else:
        print(f"\nError: Task with ID {task_id} not found.")
