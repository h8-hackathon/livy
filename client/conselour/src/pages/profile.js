import EmptyChat from '@/components/EmptyChat'
import ProfileDetail from '@/components/ProfileDetail'
import verifyUser from '@/helpers'
import { useCounselor } from '@/hooks/useCounselor'
import MainLayout from '@/layouts/Main'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Profile() {
  const { counselor, setCounselor } = useCounselor()
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
    <MainLayout side={<ProfileDetail />} children={<EmptyChat />} />
  )
}
