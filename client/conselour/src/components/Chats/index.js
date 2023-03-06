import { useChat } from "@/hooks/useChat";
import { useCounselor } from "@/hooks/useCounselor";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import Content from "./Content";
import Headers from "./Headers";
import socketIOClient from 'socket.io-client'
import { api } from "@/helpers";

export default function Chats() {
  const { counselor } = useCounselor()
  const [user, setUser] = useState()
  const { setMessages, setJoined, setSocket, setLastIndex, messages } = useChat()

  const router = useRouter()
  const { UserId } = router.query



  useEffect(() => {
    const socket = socketIOClient('https://dev-api.livy.chat/')

    socket.auth = { access_token: localStorage.access_token }

    api.get(`/counselor/chats/${UserId}`).then(({ data }) => {
      setUser(data.user)
      setMessages(data.chats)
    }).catch(() => { })

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
          console.log(error)
        })
      })

      socket.on('message', (data) => {
        setMessages((messages) => [...messages, data])
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
      {user && <Headers user={user} />}
      <Content />
      <ChatInput />
    </>
  )
}
