# Task ID: T005, T008
# CLI Task Management Application - Phase I
# Task dataclass definition

from dataclasses import dataclass


@dataclass
class Task:
    """
    Task ID: T008
    Represents a single todo item managed by the user.

    Attributes:
        id: Unique identifier, sequential starting from 1 (immutable)
        title: Task title, non-empty string (required)
        description: Optional task description (default: empty string)
        completed: Completion status (default: False = Pending)
    """
    id: int
    title: str
    description: str = ""
    completed: bool = False
