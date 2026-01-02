from typing import Annotated
from fastapi import Header, HTTPException, status


async def get_user_id(x_user_id: Annotated[str | None, Header()] = None) -> str:
    """
    Extract user_id from X-User-ID header.

    Implements FR-004, FR-005: Extracts user_id, returns 400 if missing or empty.
    """
    if not x_user_id or not x_user_id.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="X-User-Id header is required"
        )
    return x_user_id.strip()
