from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError

from .routers import tasks_router

app = FastAPI(
    title="Evolution of Todo API",
    description="REST API for the Evolution of Todo project (Phase 2.2)",
    version="0.1.0"
)


@app.exception_handler(SQLAlchemyError)
async def database_exception_handler(request: Request, exc: SQLAlchemyError):
    """Global handler for database errors."""
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={
            "error": {
                "code": "DATABASE_ERROR",
                "message": "A database error occurred. Please try again later."
            }
        },
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Global handler for unexpected errors."""
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occurred."
            }
        },
    )


app.include_router(tasks_router)


@app.get("/health", tags=["system"])
async def health_check():
    """System health check endpoint."""
    return {"status": "ok"}
