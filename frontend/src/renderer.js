const log = document.getElementById('log')
const input = document.getElementById('input')
const send = document.getElementById('send')
const voice = document.getElementById('voice')

function append(msg){
  const el = document.createElement('div')
  el.textContent = msg
  log.appendChild(el)
  log.scrollTop = log.scrollHeight
}

send.onclick = async () => {
  const text = input.value.trim()
  if(!text) return
  append('You: ' + text)
  input.value = ''
  // simple parser: if starts with 'open' or 'run' -> call run endpoint
  if(text.toLowerCase().startsWith('open ')){
    const cmd = text.split(' ')[1]
    const res = await window.jarvisAPI.run(cmd, [])
    append('Jarvis: ' + (res.output || JSON.stringify(res)))
  } else {
    const res = await window.jarvisAPI.chat(text)
    append('Jarvis: ' + res.reply)
    // speak via browser TTS
    const utter = new SpeechSynthesisUtterance(res.reply)
    speechSynthesis.speak(utter)
  }
}

// voice recognition (Web Speech API)
voice.onclick = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if(!SpeechRecognition){ alert('SpeechRecognition not supported in this Electron build.'); return }
  const recog = new SpeechRecognition()
  recog.lang = 'en-US'
  recog.interimResults = false
  recog.onresult = (ev) => {
    const text = ev.results[0][0].transcript
    input.value = text
    send.click()
  }
  recog.start()
}
