import EmptyChat from '@/components/EmptyChat'
import ProfileActivity from '@/components/ProfileActivity'
import { useCounselor } from '@/hooks/useCounselor'
import MainLayout from '@/layouts/Main'

export default function Activity() {
  const { counselor } = useCounselor()

  if (!counselor) return null

  return (
    <MainLayout >
      <ProfileActivity />
      <EmptyChat />
    </MainLayout>
  )
}
