import React from 'react'
import ChatItem from './ChatItem'

export default function ChatList({ chats, activeChatId, onSelect }) {
  return (
    <ul className="chat-list">
      {chats.map(chat => (
        <ChatItem key={chat.id} chat={chat} active={chat.id === activeChatId} onClick={() => onSelect(chat.id)} />
      ))}
      {chats.length === 0 && <li className="empty">No hay chats. Crea uno nuevo.</li>}
    </ul>
  )
}
