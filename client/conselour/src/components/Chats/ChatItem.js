
export default function ChatItem({ isMe, message, time, ref }) {
  return (
    <div ref={ref} className={`flex items-center  text-sm ${isMe ? 'justify-end' : 'justify-start'} `} >
      <div className={`bg-green-50 p-3 w-fit leading-5 rounded-t-2xl ${isMe ? 'rounded-bl-2xl' : 'rounded-br-2xl'} max-w-4xl `}>
        {message}
        <p className={`mt-1 !text-xs opacity-50 ${isMe ? 'text-right' : 'text-left'}`}>{new Date(time).toLocaleString('id-ID', {
          hour: "numeric",
          minute: "numeric"
        })}</p>
      </div>
    </div>
  )
}
