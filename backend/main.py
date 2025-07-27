from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from fastapi.responses import HTMLResponse

app = FastAPI()

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

resume_store: Dict[str, Dict] = {}

class ResumeData(BaseModel):
    user_id: str
    resume: Dict[str, str]

@app.get("/", response_class=HTMLResponse)
def root():
    return "<h1>Resume Builder Backend is running ✅</h1>"

@app.post("/ai-enhance")
def ai_enhance(data: ResumeData):
    enhanced_resume = {
        section: f"{content.strip()} ✅ (AI Enhanced)" for section, content in data.resume.items()
    }
    return {"resume": enhanced_resume}

@app.post("/save-resume")
def save_resume(data: ResumeData):
    resume_store[data.user_id] = data.resume
    return {"message": "Resume saved successfully."}

@app.get("/get-resume/{user_id}")
def get_resume(user_id: str):
    if user_id not in resume_store:
        raise HTTPException(status_code=404, detail="Resume not found")
    return {"resume": resume_store[user_id]}
