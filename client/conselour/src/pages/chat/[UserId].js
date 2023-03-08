// import { useChat } from '@/hooks/useChat'
// import { useCounselor } from '@/hooks/useCounselor'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// import socketIOClient from 'socket.io-client'

// // const socket = socketIOClient('http://localhost:4000')
// const socket = socketIOClient('https://api.livy.chat')

// const ChatBox = () => {
//   const { messages } = useChat()

//   return (
//     <div>
//       {messages.map((message, index) => (
//         <div key={index}>
//           <p>from: {message.from}</p>
//           <p>{message.text}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// const ChatInput = () => {
//   const [text, setText] = useState('')
//   const { sendMessage, joined } = useChat()
//   const { counselor } = useCounselor()

//   const router = useRouter()
//   const { UserId } = router.query
//   return (
//     <>
//       <input
//         type='text'
//         value={text}
//         disabled={!joined || !counselor}
//         className='border'
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button
//         onClick={() => {
//           // ini contoh aja man payloadnya, nanti disamain sama type ChatMessage
//           // parameter pertama adalah roomnya
//           sendMessage(`${counselor.id}-${UserId}`, { from: counselor.id, text })
//           setText('')
//         }}
//       >
//         Send
//       </button>
//     </>
//   )
// }

// const Chat = () => {
//   // ini bisa didapet dari jotai
//   const { counselor, setCounselor } = useCounselor()

//   const { setMessages, setJoined, setSocket } = useChat()

//   const router = useRouter()
//   const { UserId } = router.query

//   useEffect(() => {
//     if (UserId && counselor) {
//       setSocket(socket)
//       socket.connect()
//       socket.on('connect', () => {
//         socket.emit('join', `${counselor.id}-${UserId}`, (error) => {
//           if (!error) {
//             // ini kalo roomnya ada / sesuai schedule
//             setJoined(true)
//             return
//           }

//           // error bentuknya string
//           console.log(error)
//         })
//       })

//       socket.on('message', (data) => {
//         console.log(data)
//         setMessages((messages) => [...messages, data])
//       })
//     }

//     return () => {
//       socket.disconnect()
//       setSocket(null)
//     }
//   }, [UserId, counselor])

//   return (
//     <div>
//       {counselor ? (
//         <h1>
//           Chat as {counselor.id} with {UserId}
//         </h1>
//       ) : (
//         <div>
//           <h1>Unauthorized</h1>
//         <button
//           className='border p-1'
//           onClick={() => setCounselor({ id: 456 })}
//         >
//           Login
//         </button>
//       </div>
//       )}
//       <ChatBox />
//       <ChatInput />
//     </div>
//   )
// }

// export default Chat

import Chats from '@/components/Chats'
import Sidebar from '@/components/Sidebar'
import Spinner from '@/components/Spinner'
import { useCounselor } from '@/hooks/useCounselor'
import MainLayout from '@/layouts/Main'

export default function Home() {
  const { counselor } = useCounselor()

  if (!counselor) {
    return (
      <div className="animate-ping flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <MainLayout >
      <Sidebar />
      <Chats />
    </MainLayout>
  )
}
