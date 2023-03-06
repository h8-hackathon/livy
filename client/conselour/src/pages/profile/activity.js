import EmptyChat from '@/components/EmptyChat'
import ProfileActivity from '@/components/ProfileActivity'
import verifyUser from '@/helpers'
import { useCounselor } from '@/hooks/useCounselor'
import MainLayout from '@/layouts/Main'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Activity() {
  const { counselor, setCounselor } = useCounselor()
  const router = useRouter()

  useEffect(() => {

    verifyUser().then(data => {
      setCounselor(data)
    }).catch(() => {
      router.push('/login')
    })
  }, [])

  if (!counselor) return null

  return (
    <MainLayout side={<ProfileActivity />} children={<EmptyChat />} />
  )
}
