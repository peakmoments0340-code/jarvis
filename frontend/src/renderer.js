const log = document.getElementById('log')
const input = document.getElementById('input')
const status = document.getElementById('status')
const send = document.getElementById('send')
const voice = document.getElementById('voice')
const speakBtn = document.getElementById('speak')

function append(msg, type = 'assistant') {
  const el = document.createElement('div')
  el.className = `msg ${type}`
  el.textContent = msg
  log.appendChild(el)
  log.scrollTop = log.scrollHeight
}

async function checkHealth() {
  try {
    const response = await window.jarvisAPI.health()
    status.textContent = response && response.status === 'ok' ? 'Backend online' : 'Backend unreachable'
  } catch (err) {
    status.textContent = 'Backend unreachable — start uvicorn on port 8000'
    append('System: Start the backend with uvicorn backend.main:app --reload --port 8000', 'system')
  }
}

async function handleSend() {
  const text = input.value.trim()
  if (!text) return

  append('You: ' + text, 'user')
  input.value = ''

  try {
    const lower = text.toLowerCase()
    if (lower.startsWith('open ')) {
      const appName = text.replace(/^open\s+/i, '').trim()
      const res = await window.jarvisAPI.run('open', [appName])
      append('Jarvis: ' + (res.output || 'Opened.'), 'assistant')
      return
    }

    const res = await window.jarvisAPI.chat(text)
    append('Jarvis: ' + res.reply, 'assistant')
  } catch (err) {
    append('Jarvis: I could not reach the backend. Start it first.', 'system')
  }
}

send.addEventListener('click', handleSend)
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') handleSend()
})

speakBtn.addEventListener('click', async () => {
  const text = input.value.trim() || 'Hello from Jarvis.'
  try {
    await window.jarvisAPI.speak(text)
    append('Jarvis: speaking...', 'system')
  } catch (err) {
    append('System: TTS failed. Check backend and pyttsx3 installation.', 'system')
  }
})

voice.addEventListener('click', () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) {
    append('System: Speech recognition is not available in this browser.', 'system')
    return
  }

  const recognition = new SpeechRecognition()
  recognition.lang = 'en-US'
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    input.value = transcript
    handleSend()
  }
  recognition.onerror = () => {
    append('System: Voice recognition failed.', 'system')
  }
  recognition.start()
})

append('Jarvis ready. Ask me to open an app or chat with the assistant.', 'system')
checkHealth()
