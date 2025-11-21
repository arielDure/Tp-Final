import React from 'react'
import '../styles/Message.css'


export default function Message({ message }) {
  const time = new Date(message.time).toLocaleTimeString()
  return (
    <div className={`message ${message.sender === 'me' ? 'me' : 'them'}`}>
      <div className="bubble">
        <div className="text">{message.text}</div>
        <div className="time">{time}</div>
      </div>
    </div>
  )
}