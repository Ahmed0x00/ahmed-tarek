from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from schemas.user import UserRegister, UserLogin
from models.user import User
from database import get_db
from utils.jwt_handler import create_jwt

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_password = bcrypt.hash(user.password)
    new_user = User(email=user.email, password=hashed_password, role="customer")
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created"}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not bcrypt.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Wrong password")

    token = create_jwt({"user_id": db_user.id, "role": db_user.role})
    return {"message": "Login success", "token": token}
