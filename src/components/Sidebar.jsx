import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NewChatForm from './NewChatForm'
import '../styles/Sidebar.css'


export default function Sidebar({ chats, allChats, onAddChat, onSearch }) {
  const [query, setQuery] = useState('')
  const location = useLocation()


  const handleAdd = (name) => {
    const id = onAddChat(name)
    // navigate to new chat
    // we'll rely on Link from the list (user can click), or instruct user to click — but better: use window.history
    // Simpler: use location.replace? We'll not redirect here to keep code minimal.
  }


  const handleSearch = (e) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Chats</h2>
        <input
          className="search"
          placeholder="Buscar chats..."
          value={query}
          onChange={handleSearch}
          aria-label="Buscar chats"
        />
      </div>


      <div className="chats-list">
        {chats.length === 0 && <div className="no-results">No hay chats que coincidan.</div>}
        {chats.map(chat => (
          <Link key={chat.id} to={`/chat/${chat.id}`} className={`chat-item ${location.pathname === `/chat/${chat.id}` ? 'active' : ''}`}>
            <img src={chat.avatar} alt="avatar" className="avatar" />
            <div className="meta">
              <div className="name">{chat.name}</div>
              <div className="status">{chat.status === 'online' ? 'En línea' : `Última: ${chat.lastSeen ? new Date(chat.lastSeen).toLocaleString() : 'desconocido'}`}</div>
            </div>
          </Link>
        ))}
      </div>


      <div className="sidebar-footer">
        <NewChatForm onAdd={(name) => { handleAdd(name); onAddChat(name); }} />
      </div>
    </aside>
  )
}