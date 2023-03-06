import { useChat } from '@/hooks/useChat'
import { useCounselor } from '@/hooks/useCounselor'
import { mdiSend } from '@mdi/js'
import Icon from '@mdi/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function ChatInput() {
  const [text, setText] = useState('')
  const { sendMessage, joined } = useChat()
  const { counselor } = useCounselor()

  const router = useRouter()
  const { UserId } = router.query
  const submit = (e) => {
    e.preventDefault();
    if (text) {
      sendMessage(`${counselor.id}-${UserId}`, { from: counselor.id, text })
      setText('')
    }
  }

  return (
    <form onSubmit={submit} >
      <div className="flex items-center px-5 pb-6 rounded-lg h-20 ">
        <input disabled={!joined || !counselor} value={text} onChange={(e) => setText(e.target.value)} rows="1" className="block mx-4 p-2.5 w-full text-md text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none resize-none" placeholder="Your message..." />
        <button type="submit" className="inline-flex justify-center p-2 text-primary rounded-full cursor-pointer hover:bg-blue-">
          <Icon path={mdiSend} size={1.2} />
        </button>
      </div>
    </form>

  )
}
