import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import './styles/App.css'


// Helper to generate IDs
const uid = () => Math.random().toString(36).slice(2, 9)


const sampleChats = [
  {
    id: 'c1',
    name: 'Carlos',
    avatar: 'https://i.pravatar.cc/40?img=3',
    status: 'online',
    lastSeen: null,
    messages: [
      { id: uid(), text: 'Hola! Cómo va?', sender: 'them', time: Date.now() - 1000 * 60 * 60 },
      { id: uid(), text: 'Hola! Bien, vos?', sender: 'me', time: Date.now() - 1000 * 60 * 50 }
    ]
  },
  {
    id: 'c2',
    name: 'Mamá',
    avatar: 'https://i.pravatar.cc/40?img=5',
    status: 'offline',
    lastSeen: Date.now() - 1000 * 60 * 60 * 24,
    messages: [
      { id: uid(), text: '¿Trajiste la leche?', sender: 'them', time: Date.now() - 1000 * 60 * 60 * 24 }
    ]
  }
]


export default function App() {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('clonChats')
    return saved ? JSON.parse(saved) : sampleChats
  })
  const [filter, setFilter] = useState('')


  useEffect(() => {
    localStorage.setItem('clonChats', JSON.stringify(chats))
  }, [chats])


  const addChat = (name) => {
    const newChat = {
      id: uid(),
      name: name || `Nuevo chat ${chats.length + 1}`,
      avatar: `https://i.pravatar.cc/40?u=${Math.random()}`,
      status: 'online',
      lastSeen: null,
      messages: []
    }
    setChats(prev => [newChat, ...prev])
    return newChat.id
  }


  const sendMessage = (chatId, text) => {
    if (!text) return
    const msg = { id: uid(), text, sender: 'me', time: Date.now() }
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, messages: [...c.messages, msg] } : c))


    // Auto-reply after a small delay
    setTimeout(() => {
      const reply = { id: uid(), text: `Auto: recibí "${text.slice(0, 20)}"`, sender: 'them', time: Date.now() }
      setChats(prev => prev.map(c => c.id === chatId ? { ...c, messages: [...c.messages, reply] } : c))
    }, 800 + Math.random() * 900)
  }
  const searchChats = (q) => setFilter(q)


  const filtered = chats.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))


  return (
    <div className="app-root">
      <Sidebar
        chats={filtered}
        allChats={chats}
        onAddChat={addChat}
        onSearch={searchChats}
      />


      <main className="main-panel">
        <Routes>
          <Route path="/" element={<div className="empty-view">No seleccionaste chats. Selecciona o crea uno en la barra lateral.</div>} />
          <Route path="/chat/:id" element={<ChatRoute chats={chats} onSend={sendMessage} />} />
        </Routes>
      </main>
    </div>
  )
}

function ChatRoute({ chats, onSend }) {
  const { id } = useParams()
  const chat = chats.find(c => c.id === id)
  const navigate = useNavigate()


  useEffect(() => {
    if (!chat) {
      // invalid id -> go home
      navigate('/')
    }
  }, [chat, navigate])


  if (!chat) return null
  return <ChatWindow chat={chat} onSend={(text) => onSend(chat.id, text)} />
}