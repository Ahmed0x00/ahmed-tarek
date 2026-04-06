from fastapi import FastAPI
from database import Base, engine
import models.category
import models.product
import models.user
from routes import categories, product, auth, users

app = FastAPI(title="Final E-Commerce API")

# 📌 إنشاء الجداول في الداتابيز
Base.metadata.create_all(bind=engine)

# 📌 ربط الـ routes
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(categories.router)
app.include_router(product.router)