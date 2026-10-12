const { contextBridge } = require('electron')
const axios = require('axios')

contextBridge.exposeInMainWorld('jarvisAPI', {
  chat: async (message) => {
    const res = await axios.post('http://localhost:8000/chat', { message })
    return res.data
  },
  run: async (command, args=[]) => {
    const res = await axios.post('http://localhost:8000/run', { command, args })
    return res.data
  },
  speak: async (text) => {
    const res = await axios.post('http://localhost:8000/speak', { message: text })
    return res.data
  }
})
