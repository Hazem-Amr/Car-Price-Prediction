"""
Run this script once to create the admin account in the database.
Usage: python create_admin.py
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from database import engine, SessionLocal
import models
import auth

# Create all tables
models.Base.metadata.create_all(bind=engine)

ADMIN_EMAIL = "admin@tara.com"
ADMIN_PASSWORD = "admin#123"
ADMIN_NAME = "Admin"

db = SessionLocal()

try:
    existing = db.query(models.User).filter(models.User.email == ADMIN_EMAIL).first()
    if existing:
        print(f"Admin account already exists: {ADMIN_EMAIL}")
    else:
        hashed_password = auth.get_password_hash(ADMIN_PASSWORD)
        admin_user = models.User(
            full_name=ADMIN_NAME,
            email=ADMIN_EMAIL,
            hashed_password=hashed_password
        )
        db.add(admin_user)
        db.commit()
        print(f"✅ Admin account created successfully!")
        print(f"   Email: {ADMIN_EMAIL}")
        print(f"   Password: {ADMIN_PASSWORD}")
finally:
    db.close()
