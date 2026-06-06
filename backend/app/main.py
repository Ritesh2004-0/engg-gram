from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.note_routes import router as note_router
from app.routes.admin_routes import router as admin_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static uploads folder
app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)

# Routes
app.include_router(admin_router)
app.include_router(note_router)


@app.get("/")
def root():

    return {
        "message": "DBATU Notes API Running Successfully"
    }