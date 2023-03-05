import { useChat } from "@/hooks/useChat";
import { createRef, forwardRef, useEffect, useRef } from "react";
import ChatItem from "./ChatItem";

export default function Content() {
  const { messages, lastIndex } = useChat()
  const ref = useRef(null)

  useEffect(() => {
    console.log(ref.current)
    if (ref.current) ref.current.scrollIntoView(false)
  }, [messages])

  return (
    <div className="h-full overflow-auto scroll-smooth px-10  space-y-3 " style={{ scrollbarWidth: '0 !important ' }}>
      {messages.map((message, index) => (
        <ChatItem key={index} isMe={true} message={message.text} />
      ))}
      <div ref={ref}></div>
    </div>
  )
}
