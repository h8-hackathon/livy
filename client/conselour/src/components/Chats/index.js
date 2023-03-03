import Image from "next/image";
import ChatInput from "./ChatInput";
import Content from "./Content";
import Headers from "./Headers";

export default function Chats() {
  return (
    <div className="w-4/6 flex flex-col">
      <Headers />
      <Content />
      <ChatInput />
    </div>
  )
}
