import Chats from '@/components/Chats'
import EmptyChat from '@/components/EmptyChat'
import Sidebar from '@/components/Sidebar'
import verifyUser from '@/helpers'
import { useCounselor } from '@/hooks/useCounselor'
import MainLayout from '@/layouts/Main'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const {counselor, setCounselor } = useCounselor()
  const router = useRouter()

  useEffect(() => {
    
    verifyUser().then(data => {
      setCounselor(data)
    }).catch(() => {
      router.push('/login')
    })
  }, [])
  
  if(!counselor) return null

  return (
    <MainLayout children={<EmptyChat />} side={<Sidebar />} />
  )
}
