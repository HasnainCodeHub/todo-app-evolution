# Task ID: T004, T018, T019, T020, T024, T028, T033, T036, T037, T038
# CLI Task Management Application - Phase I
# Application entry point and main loop

from src.task_store import TaskStore
from src.cli import (
    display_menu,
    get_user_choice,
    add_task_command,
    view_tasks_command,
    toggle_complete_command,
    update_task_command,
    delete_task_command,
)


def main() -> None:
    """
    Task ID: T018
    Main application loop.

    Displays menu, gets user choice, routes to appropriate handlers.
    Continues until user chooses to exit.
    """
    store = TaskStore()

    print("\nWelcome to TODO APP - Your Task Manager!")

    # Task ID: T038 - Keyboard interrupt handling
    try:
        while True:
            display_menu()
            choice = get_user_choice()

            # Task ID: T019 - Wire menu option 1 to add_task_command
            if choice == "1":
                add_task_command(store)

            # Task ID: T024 - Wire menu option 2 to view_tasks_command
            elif choice == "2":
                view_tasks_command(store)

            # Task ID: T033 - Wire menu option 3 to update_task_command
            elif choice == "3":
                update_task_command(store)

            # Task ID: T036 - Wire menu option 4 to delete_task_command
            elif choice == "4":
                delete_task_command(store)

            # Task ID: T028 - Wire menu option 5 to toggle_complete_command
            elif choice == "5":
                toggle_complete_command(store)

            # Task ID: T020 - Graceful exit on option 6
            elif choice == "6":
                print("\nGoodbye! Your tasks have been cleared (in-memory only).")
                break

            # Task ID: T037 - Invalid menu choice handling
            else:
                print(f"\nError: Invalid choice '{choice}'. Please enter a number between 1 and 6.")

    except KeyboardInterrupt:
        # Task ID: T038 - Graceful exit on Ctrl+C
        print("\n\nInterrupted! Goodbye. Your tasks have been cleared (in-memory only).")


if __name__ == "__main__":
    main()
