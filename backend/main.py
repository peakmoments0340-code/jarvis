from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from .ai_client import AIClient
from .commands import run_whitelisted_command
from .tts import speak_text

load_dotenv()

app = FastAPI(title="Jarvis Backend")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MODEL = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")

ai = AIClient(api_key=OPENAI_API_KEY, model=MODEL)

class ChatReq(BaseModel):
    message: str

class RunReq(BaseModel):
    command: str
    args: list[str] = []

@app.post("/chat")
async def chat(req: ChatReq):
    if not req.message:
        raise HTTPException(status_code=400, detail="message required")
    resp = ai.chat(req.message)
    return {"reply": resp}

@app.post("/run")
async def run_command(req: RunReq):
    # run only whitelisted commands
    out = run_whitelisted_command(req.command, req.args)
    return {"output": out}

@app.post("/speak")
async def speak(req: ChatReq):
    # speaks text on the host machine (Windows)
    speak_text(req.message)
    return {"status": "spoken"}

