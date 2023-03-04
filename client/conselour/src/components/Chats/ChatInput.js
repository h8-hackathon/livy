import { mdiSend } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'

export default function ChatInput() {
  return (
    <form >
      <div className="flex items-center px-5 pb-6  rounded-lg h-20 ">
        <textarea id="chat" rows="1" className="block mx-4 p-3 w-full text-md text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none resize-none" placeholder="Your message..."></textarea>
        <button type="submit" className="inline-flex justify-center p-2 text-primary rounded-full cursor-pointer hover:bg-blue-">
          <Icon path={mdiSend} size={1.2} />
        </button>
      </div>
    </form>

  )
}
