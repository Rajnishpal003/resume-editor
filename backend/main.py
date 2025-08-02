from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from fastapi.responses import HTMLResponse
import os
from dotenv import load_dotenv
from openai import OpenAI
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# Load OpenAI API Key
app = FastAPI()

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",  # local dev
        "https://resume-editor-lac.vercel.app/",  # ✅ your fixed production domain
    ],
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

# @app.post("/ai-enhance")
# def ai_enhance(data: ResumeData):
#     enhanced_resume = {
#         section: f"{content.strip()} ✅ (AI Enhanced)" for section, content in data.resume.items()
#     }
#     return {"resume": enhanced_resume}

# 🧠 Real AI Enhance Endpoint


@app.post("/ai-enhance")
def ai_enhance(data: ResumeData):
    resume = data.resume

    prompt = f"""
You are a professional resume writer. Based on the following user-provided data, generate a polished job description and a short professional bio.

Job Title: {resume.get("job_title", "")}
Company: {resume.get("company", "")}
Start Date: {resume.get("start_date", "")}
End Date: {resume.get("end_date", "")}
Location: {resume.get("location", "")}
Education: {resume.get("education", "")}
Skills: {resume.get("skills", "")}
Short Bio: {resume.get("short_bio", "")}

Format:
Description: <job description>
Short Bio: <bio>
"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a resume optimization assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=400,
            temperature=0.7
        )

        content = response.choices[0].message.content

        # Parse the content
        description, short_bio = "", ""
        if "Short Bio:" in content:
            parts = content.split("Short Bio:")
            description = parts[0].replace("Description:", "").strip()
            short_bio = parts[1].strip()
        else:
            description = content.strip()

        enhanced_resume = {
            **resume,
            "description": description,
            "short_bio": short_bio
        }

        return {"resume": enhanced_resume}

    except Exception as e:
        print("❌ OpenAI Error:", str(e))
        # Fallback logic
        enhanced_resume = {
            section: f"{content.strip()} ✅ (AI Enhanced)"
            for section, content in resume.items()
        }
        return {"resume": enhanced_resume}

print("🔑 OpenAI API Key Loaded:", client.api_key is not None)


@app.post("/save-resume")
def save_resume(data: ResumeData):
    resume_store[data.user_id] = data.resume
    return {"message": "Resume saved successfully."}

@app.get("/get-resume/{user_id}")
def get_resume(user_id: str):
    if user_id not in resume_store:
        raise HTTPException(status_code=404, detail="Resume not found")
    return {"resume": resume_store[user_id]}
