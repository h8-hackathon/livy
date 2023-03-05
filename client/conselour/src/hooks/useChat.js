import { atom, useAtom } from 'jotai'

const socketAtom = atom(null)
const messagesAtom = atom([])
const joinedAtom = atom(false)

export const useChat = () => {
  const [socket, setSocket] = useAtom(socketAtom)
  const [messages, setMessages] = useAtom(messagesAtom)
  const [joined, setJoined] = useAtom(joinedAtom)

  const sendMessage = (room, payload) => {
    if (socket && socket.connected) {
      socket.emit('message', room, payload)
    }
  }

  return { messages, joined, sendMessage, setSocket, setMessages, setJoined }
}
