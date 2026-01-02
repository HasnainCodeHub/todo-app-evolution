from fastapi import APIRouter, Depends, status, HTTPException
from typing import List

from ..schemas import TaskCreate, TaskUpdate, TaskResponse
from ..dependencies import get_user_id
from ..crud import task as crud

router = APIRouter(prefix="/api/tasks", tags=["tasks"])


@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    payload: TaskCreate,
    user_id: str = Depends(get_user_id)
):
    """Create a new task."""
    try:
        return crud.create_task(
            title=payload.title,
            description=payload.description,
            user_id=user_id
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database error: {str(e)}"
        )


@router.get("/", response_model=List[TaskResponse])
async def list_tasks(user_id: str = Depends(get_user_id)):
    """List all tasks for the current user."""
    try:
        return crud.get_tasks(user_id=user_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database error: {str(e)}"
        )


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int, user_id: str = Depends(get_user_id)):
    """Get a specific task by ID."""
    try:
        task = crud.get_task(task_id=task_id, user_id=user_id)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
        return task
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database error: {str(e)}"
        )


@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int,
    payload: TaskUpdate,
    user_id: str = Depends(get_user_id)
):
    """Update a specific task."""
    try:
        task = crud.update_task(
            task_id=task_id,
            user_id=user_id,
            title=payload.title,
            description=payload.description,
            completed=payload.completed
        )
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
        return task
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database error: {str(e)}"
        )


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(task_id: int, user_id: str = Depends(get_user_id)):
    """Delete a specific task."""
    try:
        success = crud.delete_task(task_id=task_id, user_id=user_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database error: {str(e)}"
        )


@router.patch("/{task_id}/complete", response_model=TaskResponse)
async def toggle_task_complete(task_id: int, user_id: str = Depends(get_user_id)):
    """Toggle task completion status."""
    try:
        task = crud.toggle_complete(task_id=task_id, user_id=user_id)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
        return task
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database error: {str(e)}"
        )
