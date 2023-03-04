import Chats from '@/components/Chats'
import Sidebar from '@/components/Sidebar'
import MainLayout from '@/layouts/Main'

export default function Home() {
  return (
    <MainLayout children={<Chats />} side={<Sidebar />} />
  )
}
