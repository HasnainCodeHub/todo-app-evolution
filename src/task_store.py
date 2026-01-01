# Task ID: T006, T009, T010, T011, T012, T025, T029, T034
# CLI Task Management Application - Phase I
# In-memory storage and task operations

from src.task_model import Task


class TaskStore:
    """
    Task ID: T009
    In-memory storage container for all tasks.

    Attributes:
        tasks: Ordered list of all active tasks
        next_id: Counter for next task ID (starts at 1)
    """

    def __init__(self):
        """Initialize empty task store with ID counter starting at 1."""
        self.tasks: list[Task] = []
        self.next_id: int = 1

    def add(self, title: str, description: str = "") -> Task:
        """
        Task ID: T010
        Create a new task with auto-incremented ID.

        Args:
            title: Task title (required, non-empty)
            description: Optional task description

        Returns:
            The newly created Task object
        """
        task = Task(
            id=self.next_id,
            title=title,
            description=description,
            completed=False
        )
        self.tasks.append(task)
        self.next_id += 1
        return task

    def get_all(self) -> list[Task]:
        """
        Task ID: T011
        Returns list of all tasks.

        Returns:
            List of all Task objects in storage
        """
        return self.tasks

    def get_by_id(self, task_id: int) -> Task | None:
        """
        Task ID: T012
        Find task by ID.

        Args:
            task_id: The ID of the task to find

        Returns:
            Task object if found, None otherwise
        """
        for task in self.tasks:
            if task.id == task_id:
                return task
        return None

    def toggle_complete(self, task_id: int) -> Task | None:
        """
        Task ID: T025
        Toggle the completion status of a task.

        Args:
            task_id: The ID of the task to toggle

        Returns:
            Updated Task object if found, None otherwise
        """
        task = self.get_by_id(task_id)
        if task:
            task.completed = not task.completed
            return task
        return None

    def update(self, task_id: int, title: str | None = None, description: str | None = None) -> Task | None:
        """
        Task ID: T029
        Update a task's title and/or description.

        Args:
            task_id: The ID of the task to update
            title: New title (None = keep current)
            description: New description (None = keep current)

        Returns:
            Updated Task object if found, None otherwise
        """
        task = self.get_by_id(task_id)
        if task:
            if title is not None:
                task.title = title
            if description is not None:
                task.description = description
            return task
        return None

    def delete(self, task_id: int) -> bool:
        """
        Task ID: T034
        Delete a task from storage.

        Args:
            task_id: The ID of the task to delete

        Returns:
            True if task was deleted, False if not found
        """
        task = self.get_by_id(task_id)
        if task:
            self.tasks.remove(task)
            return True
        return False
