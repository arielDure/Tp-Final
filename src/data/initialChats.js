const now = () => new Date().toISOString()

export const initialChats = [
  {
    id: 1,
    name: 'María',
    avatar: 'https://i.pravatar.cc/150?img=12',
    status: 'online',
    lastSeen: null,
    messages: [
      { id: 1, from: 'them', text: 'Hola! ¿Cómo andás?', time: now() },
      { id: 2, from: 'me', text: 'Todo bien, ¿vos?', time: now() },
    ],
  },
  {
    id: 2,
    name: 'Proyecto',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'offline',
    lastSeen: now(),
    messages: [
      { id: 1, from: 'them', text: 'Recordá subir el informe', time: now() },
    ],
  },
]
