import React, { useState } from 'react'
import '../styles/NewChatForm.css'


export default function NewChatForm({ onAdd }) {
    const [name, setName] = useState('')


    const submit = (e) => {
        e.preventDefault()
        if (!name.trim()) return
        onAdd(name.trim())
        setName('')
    }


    return (
        <form className="new-chat-form" onSubmit={submit}>
            <input type="text" placeholder="Nombre nuevo chat" value={name} onChange={e => setName(e.target.value)} />
            <button type="submit">Crear</button>
        </form>
    )
}
