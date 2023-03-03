import React from 'react'

export default function ChatInput() {
  return (
    <form >
      <div className="flex items-center px-5 pb-6  rounded-lg h-20 ">
        <button type="button" className="p-2 text-primary rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 ">
          <svg aria-hidden="true" className="w-9 h-9" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Add emoji</span>
        </button>
        <textarea id="chat" rows="1" className="block mx-4 p-3 w-full text-md text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none resize-none" placeholder="Your message..."></textarea>
        <button type="submit" className="inline-flex justify-center p-2 text-primary rounded-full cursor-pointer hover:bg-blue-">
          <svg aria-hidden="true" className="w-9 h-9   rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>

  )
}
