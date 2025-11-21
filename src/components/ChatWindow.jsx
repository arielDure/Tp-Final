import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import '../styles/ChatWindow.css'


export default function ChatWindow({ chat, onSend }) {
  const [text, setText] = useState('')
  const scrollRef = useRef(null)


  useEffect(() => {
    // scroll to bottom when chat or messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chat.messages.length])


  const submit = (e) => {
    e?.preventDefault()
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
  }
  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={chat.avatar} alt="avatar" />
        <div className="chat-title">
          <div className="name">{chat.name}</div>
          <div className="sub">{chat.status === 'online' ? 'En línea' : 'Offline'}</div>
        </div>
      </div>


      <div className="messages" ref={scrollRef}>
        {chat.messages.map(m => (
          <Message key={m.id} message={m} />
        ))}
      </div>


      <form className="composer" onSubmit={submit}>
        <input
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}