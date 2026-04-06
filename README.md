# E-Commerce Backend Project

A scalable RESTful API backend system for an online e-commerce platform built with **FastAPI** and **SQLAlchemy**.

## 🚀 Quick Start & Testing

Follow these quick steps to get the app running and test it using the built-in Frontend Dashboard.

### 1. Install Dependencies
Ensure you have `pip` installed, then run the following in the project root:
```bash
pip install -r requirements.txt
```

### 2. Start the Backend Server
Run the FastAPI development server:
```bash
cd app
uvicorn main:app --reload
```
*(The database `ecommerce.db` will be dynamically generated in the `app/` folder upon first run)*

### 3. Test Using the Dashboard!
We have bundled a sleek HTML frontend right into the project so you can visually test everything.
- Open the `frontend/index.html` file directly in your web browser (Chrome, Edge, Firefox).
- The dashboard lets you visually test: 
  - Registering and logging in directly.
  - Adding product categories.
  - Submitting new products assigned to your categories.

### 4. Advanced API Documentation
If you want to manually test raw API endpoints, you can access the automatically generated interactive documentation while the server is running:
- **Swagger UI:** `http://localhost:8000/docs`

---

## Overview
This unified project combines Authentication & Users logic alongside Categories & Products operations to create a seamless backend experience. The codebase has been cleanly integrated to utilize a single SQLite database without conflict.

## Features Included
- **User Authentication:** Token-based secure registration and login (using JWT and pure `bcrypt`).
- **Users Management:** Protected `/users/me` endpoint.
- **Product Management:** Full CRUD actions, advanced filtering, and pagination.
- **Category Management:** Full CRUD actions for organizing products easily.

## Tech Stack
- **Framework:** FastAPI
- **Database ORM:** SQLAlchemy (Using SQLite database)
- **Data Validation:** Pydantic
- **Security:** `bcrypt` (for solid secure hashing) & `pyjwt` (for Authentication Tokens)
