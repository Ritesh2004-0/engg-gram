import cloudinary.uploader

from bson import ObjectId

from fastapi import (

    APIRouter,
    UploadFile,
    File,
    Form,
    Depends,
    HTTPException
)

from app.database.connection import db

from app.utils.auth import verify_token

from app.utils.cloudinary_config import *

router = APIRouter()

notes_collection = db["notes"]


# =========================
# Upload Note
# =========================

@router.post("/notes/upload")

async def upload_note(

    title: str = Form(...),

    branchId: str = Form(...),

    subject: str = Form(...),

    semester: str = Form(...),

    file: UploadFile = File(...),

    user=Depends(verify_token)

):

    # Validate PDF
    if not file.filename.endswith(".pdf"):

        raise HTTPException(

            status_code=400,

            detail="Only PDF files allowed"
        )

    # Upload PDF to Cloudinary
    filename = file.filename.replace(".pdf", "")

    upload_result = cloudinary.uploader.upload(
    file.file,
    resource_type="raw",
    folder="dbatu_notes",
    public_id=filename
)

    pdf_url = upload_result["secure_url"]
    print(upload_result)

    # MongoDB document
    note = {

        "title": title,

        "branchId": branchId,

        "subject": subject,

        "semester": semester,

        "file_url": pdf_url,

        "downloads": 0,

        "likes": 0
    }

    result = notes_collection.insert_one(note)

    return {

        "message":
            "Note Uploaded Successfully",

        "note_id":
            str(result.inserted_id)
    }


# =========================
# Get Notes
# =========================

@router.get("/notes")

def get_notes(

    search: str = "",

    branchId: str = "",

    semester: str = ""

):

    query = {}

    # Search
    if search:

        query["$or"] = [

            {
                "title": {
                    "$regex": search,
                    "$options": "i"
                }
            },

            {
                "subject": {
                    "$regex": search,
                    "$options": "i"
                }
            }
        ]

    # Branch Filter
    if branchId:

        query["branchId"] = branchId

    # Semester Filter
    if semester:

        query["semester"] = semester

    notes = []

    for note in notes_collection.find(query):

        note["_id"] = str(note["_id"])

        notes.append(note)

    return notes


# =========================
# Increment Download Count
# =========================

@router.put("/notes/download/{note_id}")

def increment_download(note_id: str):

    notes_collection.update_one(

        {"_id": ObjectId(note_id)},

        {
            "$inc": {

                "downloads": 1
            }
        }
    )

    return {

        "message":
            "Download Count Updated"
    }


# =========================
# Like Note
# =========================

@router.put("/notes/like/{note_id}")

def like_note(note_id: str):

    notes_collection.update_one(

        {"_id": ObjectId(note_id)},

        {
            "$inc": {

                "likes": 1
            }
        }
    )

    return {

        "message":
            "Note Liked"
    }


# =========================
# Delete Note
# =========================

@router.delete("/notes/{note_id}")

def delete_note(

    note_id: str,

    user=Depends(verify_token)

):

    note = notes_collection.find_one({

        "_id": ObjectId(note_id)
    })

    if not note:

        raise HTTPException(

            status_code=404,

            detail="Note not found"
        )

    # Delete MongoDB document
    notes_collection.delete_one({

        "_id": ObjectId(note_id)
    })

    return {

        "message":
            "Note Deleted Successfully"
    }
    
@router.put("/notes/like/{note_id}")

def increment_like(note_id: str):

    notes_collection.update_one(

        {"_id": ObjectId(note_id)},

        {
            "$inc": {

                "likes": 1
            }
        }
    )

    return {

        "message":
        "Like Updated"
    }