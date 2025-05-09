from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from ..database import get_db
from ..models.user import User
from ..schemas.user import UserCreate, UserResponse, Token
from ..utils.auth import (
    verify_password,
    get_password_hash,
    create_access_token,
    get_current_user
)
from ..config import settings

# Create router
router = APIRouter(prefix="/api/users", tags=["users"])


# @router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
# async def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
#     """Register a new user"""
#     # Check if username or email already exists
#     existing_user = db.query(User).filter(
#         (User.username == user_data.username) | (User.email == user_data.email)
#     ).first()
#
#     if existing_user:
#         if existing_user.username == user_data.username:
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST,
#                 detail="Username already registered"
#             )
#         else:
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST,
#                 detail="Email already registered"
#             )
#
#     # Create new user
#     hashed_password = get_password_hash(user_data.password)
#
#     db_user = User(
#         username=user_data.username,
#         email=user_data.email,
#         hashed_password=hashed_password
#     )
#
#     try:
#         db.add(db_user)
#         db.commit()
#         db.refresh(db_user)
#         return db_user
#     except IntegrityError:
#         db.rollback()
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Error creating user"
#         )
@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        (User.username == user_data.username) | (User.email == user_data.email)
    ).first()
    if existing_user:
        if existing_user.username == user_data.username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already registered"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

    # create new user
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_password
    )
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail="Error creating user"
        )

@router.post("/login", response_model=Token)
async def login_user(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: Session = Depends(get_db)
):
    """Login a user"""
    # Find user by username or email
    user = db.query(User).filter(
        (User.username == form_data.username) | (User.email == form_data.username)
    ).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Update last login time
    user.last_login = datetime.utcnow()
    db.commit()

    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

# @router.get("/me", response_model=UserResponse)
# async def get_user_profile(current_user: User = Depends(get_current_user)):
#     """Get current user profile"""
#     return current_user
#
#
# @router.put("/me", response_model=UserResponse)
# async def update_user_profile(
#         user_data: UserCreate,
#         current_user: User = Depends(get_current_user),
#         db: Session = Depends(get_db)
# ):
#     """Update current user profile"""
#     # Check if username or email already exists (if changed)
#     if user_data.username != current_user.username or user_data.email != current_user.email:
#         existing_user = db.query(User).filter(
#             ((User.username == user_data.username) | (User.email == user_data.email)) &
#             (User.id != current_user.id)
#         ).first()
#
#         if existing_user:
#             if existing_user.username == user_data.username:
#                 raise HTTPException(
#                     status_code=status.HTTP_400_BAD_REQUEST,
#                     detail="Username already taken"
#                 )
#             else:
#                 raise HTTPException(
#                     status_code=status.HTTP_400_BAD_REQUEST,
#                     detail="Email already registered"
#                 )
#
#     # Update user data
#     current_user.username = user_data.username
#     current_user.email = user_data.email
#
#     if user_data.password:
#         current_user.hashed_password = get_password_hash(user_data.password)
#
#     try:
#         db.commit()
#         db.refresh(current_user)
#         return current_user
#     except IntegrityError:
#         db.rollback()
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Error updating user"
#         )
