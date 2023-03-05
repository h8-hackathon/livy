import { useChat } from "@/hooks/useChat";
import { createRef, forwardRef, useEffect, useRef } from "react";
import ChatItem from "./ChatItem";

export default function Content() {
  const { messages } = useChat()
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView(false)
  }, [messages])

  return (
    <div className="h-full overflow-auto scroll-smooth mx-8 my-3 space-y-3 " style={{ scrollbarWidth: '0 !important ' }}>
      {messages.map((message, index) => (
        <ChatItem key={index} isMe={true} message={message.text} />
      ))}
      <div ref={ref}></div>
    </div>
  )
}
