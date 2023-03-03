import Chats from '@/components/Chats'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <div className='flex max-h-screen w-full'>
      <Sidebar />
      <Chats />
    </div>
  )
}
