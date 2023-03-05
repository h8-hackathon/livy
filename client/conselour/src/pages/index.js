import Chats from '@/components/Chats'
import EmptyChat from '@/components/EmptyChat'
import Sidebar from '@/components/Sidebar'
import MainLayout from '@/layouts/Main'
import Image from 'next/image'

export default function Home() {
  return (
    <MainLayout children={<EmptyChat />} side={<Sidebar />} />
  )
}
