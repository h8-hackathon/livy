import { useChat } from "@/hooks/useChat";
import { useCounselor } from "@/hooks/useCounselor";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ChatInput from "./ChatInput";
import Content from "./Content";
import Headers from "./Headers";
import socketIOClient from 'socket.io-client'

const socket = socketIOClient('https://api.livy.chat/')

export default function Chats() {
  const { counselor } = useCounselor()

  const { setMessages, setJoined, setSocket, setLastIndex, messages } = useChat()

  const router = useRouter()
  const { UserId } = router.query


  useEffect(() => {
    if (UserId && counselor) {
      setSocket(socket)
      socket.connect()
      socket.on('connect', () => {
        socket.emit('join', `${counselor.id}-${1}`, (error) => {
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
      <Headers />
      <Content />
      <ChatInput />
    </>
  )
}
