import { useChat } from "@/hooks/useChat";
import { useCounselor } from "@/hooks/useCounselor";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import Content from "./Content";
import Headers from "./Headers";
import socketIOClient from 'socket.io-client'
import { api } from "@/helpers";
import { toast } from "react-toastify";

export default function Chats() {
  const { counselor } = useCounselor()
  const [user, setUser] = useState()
  const { setMessages, setJoined, setSocket, setLastIndex, messages } = useChat()
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { UserId } = router.query

  useEffect(() => {
    const socket = socketIOClient('https://api.livy.chat')

    socket.auth = { access_token: localStorage.access_token }

    api.get(`/counselor/chats/${UserId}`).then(({ data }) => {
      setUser(data.user)
      setMessages(data.chats)
    })
      .catch(error => toast.error(error.response.data.message))
      .finally(() => setLoading(false))

    if (UserId && counselor && !socket.connected) {
      setSocket(socket)
      socket.on('connect', () => {
        socket.emit('join', `${counselor.id}-${UserId}`, (error) => {
          if (!error) {
            // ini kalo roomnya ada / sesuai schedule
            setJoined(true)
            return
          }

          // error bentuknya string
          toast.error(error)
        })
      })

      socket.on('message', (data) => {
        setMessages((messages) => [...messages, { ...data, time: new Date() }])
        setLastIndex(messages.length)
      })
    }

    return () => {
      socket.disconnect()
      setSocket(null)
    }
  }, [])


  return (
    <>
      <Headers user={user} loading={loading} />
      <Content loading={loading} />
      <ChatInput />
    </>
  )
}
