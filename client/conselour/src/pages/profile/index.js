import EmptyChat from '@/components/EmptyChat'
import ProfileDetail from '@/components/ProfileDetail'
import { useCounselor } from '@/hooks/useCounselor'
import MainLayout from '@/layouts/Main'

export default function Profile() {
  const { counselor } = useCounselor()

  if (!counselor) return null

  return (
    <MainLayout >
      <ProfileDetail />
      <EmptyChat />
    </MainLayout>
  )
}
