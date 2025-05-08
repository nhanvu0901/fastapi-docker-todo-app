from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.user import User
from ..models.todo import Todo
from ..schemas.todo import TodoCreate, TodoUpdate, TodoResponse
from ..utils.auth import get_current_user

# Create router
router = APIRouter(prefix="/api/todos", tags=["todos"])


@router.get("/", response_model=List[TodoResponse])
async def get_all_todos(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """Get all todos for the current user"""
    todos = db.query(Todo).filter(Todo.user_id == current_user.id).all()
    return todos


@router.get("/{todo_id}", response_model=TodoResponse)
async def get_todo_by_id(
        todo_id: int,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """Get a specific todo by ID"""
    todo = db.query(Todo).filter(
        Todo.id == todo_id,
        Todo.user_id == current_user.id
    ).first()

    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )

    return todo


@router.post("/", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(
        todo_data: TodoCreate,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """Create a new todo"""
    new_todo = Todo(
        title=todo_data.title,
        description=todo_data.description,
        completed=todo_data.completed,
        user_id=current_user.id
    )

    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return new_todo


@router.put("/{todo_id}", response_model=TodoResponse)
async def update_todo(
        todo_id: int,
        todo_data: TodoUpdate,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """Update a todo"""
    todo = db.query(Todo).filter(
        Todo.id == todo_id,
        Todo.user_id == current_user.id
    ).first()

    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )

    # Update todo with provided data
    update_data = todo_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(todo, key, value)

    db.commit()
    db.refresh(todo)

    return todo


@router.delete("/{todo_id}", status_code=status.HTTP_200_OK)
async def delete_todo(
        todo_id: int,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """Delete a todo"""
    todo = db.query(Todo).filter(
        Todo.id == todo_id,
        Todo.user_id == current_user.id
    ).first()

    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )

    db.delete(todo)
    db.commit()

    return {"message": "Todo deleted successfully"}