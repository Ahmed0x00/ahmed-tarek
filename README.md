# E-Commerce Backend Project

A scalable RESTful API backend system for an online e-commerce platform built with **FastAPI** and **SQLAlchemy**.

## Overview
This unified project combines Authentication & Users logic alongside Categories & Products operations to create a seamless backend experience. The codebase has been cleanly integrated to utilize a single `sqlite` database.

## Features Included
- **User Authentication:** Token-based secure registration and login (JWT).
- **Users Management:** Protected `/users/me` endpoints.
- **Product Management:** Full CRUD actions, advanced filtering, and pagination.
- **Category Management:** Full CRUD actions for organizing products easily.

## Tech Stack
- **Framework:** FastAPI
- **Database ORM:** SQLAlchemy (Using SQLite database)
- **Data Validation:** Pydantic
- **Security:** `passlib` (for hashing) & `pyjwt` (for Authentication Tokens)

## How to Run locally

### 1. Install Dependencies
Ensure you have `pip` installed, then run the following in the project root:
```bash
pip install -r requirements.txt
```

### 2. Start the Application
Run the FastAPI development server:
```bash
cd app
uvicorn main:app --reload
```

### 3. Access API Documentation
Once running, you can access the automatically generated interactive documentation:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

*(The database `ecommerce.db` will be dynamically generated in the `app/` folder upon first run)*
