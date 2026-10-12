# Jarvis - Personal Assistant (Starter)

This repository contains a starter scaffold for a Windows-focused personal assistant ("Jarvis"). It includes a Python FastAPI backend (AI + command execution + TTS) and an Electron-based desktop frontend with speech input.

Features in this starter:
- Chat endpoint that forwards messages to an LLM (OpenAI by default).
- Simple, safe command launcher (whitelisted commands only).
- TTS via pyttsx3 on the backend (Windows-ready).
- Electron frontend with a minimal chat UI and browser SpeechRecognition for voice input.

Important notes and safety:
- This scaffold runs arbitrary system commands only from a small whitelist to reduce risk. Review and adjust `backend/commands.py` before adding commands.
- Keep your API keys secret. Use the .env file (not committed) for keys.

Quick start (developer machine on Windows):

1) Clone the repo (already created for you):
   git clone https://github.com/peakmoments0340-code/jarvis
   cd jarvis

2) Backend setup (Python 3.10+ recommended):
   python -m venv .venv
   .\.venv\Scripts\activate
   pip install -r backend/requirements.txt
   copy backend\.env.example backend\.env  # then edit backend\.env with your OPENAI_API_KEY or set up Ollama

   Start the backend:
   uvicorn backend.main:app --reload --port 8000

3) Frontend setup (Node.js 18+ recommended):
   cd frontend
   npm install
   npm start

   This will open the Electron window that connects to the backend at http://localhost:8000.

What's next:
- Swap OpenAI for Ollama/local LLM if you prefer offline models (instructions in README).
- Add wake-word detection, persistent memory, and more integrations (calendar, email, GitHub).

Repo: https://github.com/peakmoments0340-code/jarvis

