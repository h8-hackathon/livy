import { atom, useAtom } from 'jotai'

const socketAtom = atom(null)
const messagesAtom = atom([])
const joinedAtom = atom(false)
const lastIndexAtom = atom(0)

export const useChat = () => {
  const [socket, setSocket] = useAtom(socketAtom)
  const [messages, setMessages] = useAtom(messagesAtom)
  const [joined, setJoined] = useAtom(joinedAtom)
  const [lastIndex, setLastIndex] = useAtom(lastIndexAtom)
  
  const sendMessage = (room, payload) => {
    if (socket && socket.connected) {
      socket.emit('message', room, payload)
    }
  }

  return { messages, joined, sendMessage, setSocket, setMessages, setJoined, lastIndex, setLastIndex }
}
