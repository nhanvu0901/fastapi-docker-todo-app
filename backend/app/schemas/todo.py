from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None


class TodoCreate(TodoBase):
    completed: bool = False


class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    completed: Optional[bool] = None


class TodoList(TodoBase):
    id: int
    user_id: int
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True