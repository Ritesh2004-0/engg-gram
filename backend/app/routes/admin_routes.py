from fastapi import (
    APIRouter,
    HTTPException,
    Depends
)

from app.utils.auth import (
    hash_password,
    verify_password,
    create_access_token,
    verify_token
)

router = APIRouter()

# =========================
# Temporary Admin
# =========================

fake_admin = {

    "email": "riteshadling159@gmail.com",

    "password": hash_password(
        "ritesh@159"
    )
}

# =========================
# Admin Login
# =========================

@router.post("/admin/login")

def admin_login(data: dict):

    email = data.get("email")

    password = data.get("password")

    # Email Check

    if email != fake_admin["email"]:

        raise HTTPException(

            status_code=401,

            detail="Invalid Email"
        )

    # Password Check

    if not verify_password(

        password,

        fake_admin["password"]
    ):

        raise HTTPException(

            status_code=401,

            detail="Invalid Password"
        )

    # Create JWT Token

    token = create_access_token(

        data={
            "sub": email
        }
    )

    return {

        "access_token": token,

        "token_type": "bearer"
    }

# =========================
# Verify Admin Token
# =========================

@router.get("/admin/verify")

def verify_admin(

    user=Depends(verify_token)

):

    return {

        "message":
        "Valid Token"
    }