# Jarvis - Personal Assistant

Jarvis is a Windows-first personal assistant starter that combines:
- a Python FastAPI backend
- a desktop Electron frontend
- AI chat via OpenAI or local Ollama
- voice input/output
- controlled local command execution for safe actions

This version adds the next layer of functionality beyond the initial scaffold:
- local model fallback with Ollama
- safer command routing for common Windows actions
- improved desktop chat UI
- app launch support and speech output
- clearer setup instructions for Windows developers

Project structure
- backend/ - Python API service
- frontend/ - Electron desktop shell

Quick start on Windows

1) Create a virtual environment
   py -m venv .venv
   .\.venv\Scripts\Activate.ps1

2) Install backend dependencies
   pip install -r backend\requirements.txt

3) Configure environment
   Copy-Item backend\.env.example backend\.env
   Edit backend\.env and set one of:
   - OPENAI_API_KEY=your_key
   - or OLLAMA_HOST=http://localhost:11434

4) Start the API
   uvicorn backend.main:app --reload --port 8000

5) Start the Electron app in another terminal
   cd frontend
   npm install
   npm start

How it works
- The frontend sends messages to the backend at http://localhost:8000/chat.
- The backend uses OpenAI if OPENAI_API_KEY is present.
- If not, it falls back to Ollama when OLLAMA_HOST is available.
- Commands such as "open notepad" or "open calc" are routed through a whitelist.
- Voice input is supported in the browser via Web Speech API.
- Spoken responses are generated via the backend using pyttsx3.

Supported starter commands
- open notepad
- open calc
- open explorer
- open cmd
- open code
- open chrome
- open edge

Important safety notes
- This starter intentionally limits actions to a small allowlist.
- You should review backend/commands.py before adding anything beyond harmless apps.
- Never expose this API publicly without proper authentication.

Example prompts
- Hello Jarvis
- Open notepad
- What is the weather in New York?
- Summarize my tasks for today
- Tell me the current date and time

Optional: Ollama
- Install Ollama from https://ollama.com
- Pull a model such as llama3.1 or qwen2.5
- Start it locally: ollama run llama3.1
- Set your backend env to OLLAMA_HOST=http://localhost:11434
- The app will automatically prefer local LLM responses when the API key is missing

Repository
https://github.com/peakmoments0340-code/jarvis
