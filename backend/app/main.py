from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.note_routes import router as note_router
from app.routes.admin_routes import router as admin_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_router)
app.include_router(note_router)

@app.get("/")
def root():
    return {
        "message": "DBATU Notes API Running Successfully"
    }