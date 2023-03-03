
export default function ChatItem({ isMe, message }) {
  return (
    <div className={`flex items-center  ${isMe ? 'justify-end' : 'justify-start'} `} >
      <p className={`bg-green-50 p-4 w-fit rounded-t-2xl ${isMe ? 'rounded-bl-2xl' : 'rounded-br-2xl'} max-w-4xl `}>
        {message}
      </p>
    </div>
  )
}
