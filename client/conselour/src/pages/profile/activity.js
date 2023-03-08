import EmptyChat from '@/components/EmptyChat'
import ProfileActivity from '@/components/ProfileActivity'
import Spinner from '@/components/Spinner'
import { useCounselor } from '@/hooks/useCounselor'
import MainLayout from '@/layouts/Main'

export default function Activity() {
  const { counselor } = useCounselor()

  if (!counselor) {
    return (
      <div className="animate-ping flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }
  return (
    <MainLayout >
      <ProfileActivity />
      <EmptyChat />
    </MainLayout>
  )
}
