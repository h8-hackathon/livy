import { useChat } from "@/hooks/useChat";
import { useCounselor } from "@/hooks/useCounselor";
import { useEffect, useRef } from "react";
import Spinner from "../Spinner";
import ChatItem from "./ChatItem";

export default function Content({ loading }) {
  const { messages } = useChat()
  const ref = useRef(null)
  const { counselor } = useCounselor()

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView(false)
  }, [messages])

  return (
    <div className="h-full overflow-auto scroll-smooth mx-8 my-3 space-y-3 " style={{ scrollbarWidth: '0 !important ' }}>
      {!loading &&  messages.map((message, index) => (
        <ChatItem key={index} isMe={message.sender.UserId == counselor.id} message={message.text} time={message.time} />
      ))}
      {loading && <div className="animate-ping flex justify-center items-center h-full"><Spinner /></div>}
      <div ref={ref}></div>
    </div>
  )
}
