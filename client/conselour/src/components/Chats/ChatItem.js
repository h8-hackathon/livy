
export default function ChatItem({ isMe, message, ref }) {
  return (
    <div ref={ref} className={`flex items-center text-sm ${isMe ? 'justify-end' : 'justify-start'} `} >
      <p className={`bg-green-50 p-3 w-fit leading-5 rounded-t-2xl ${isMe ? 'rounded-bl-2xl' : 'rounded-br-2xl'} max-w-4xl `}>
        {message}
      </p>
    </div>
  )
}
