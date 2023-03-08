import EmptyChat from '@/components/EmptyChat'
import ProfileDetail from '@/components/ProfileDetail'
import Spinner from '@/components/Spinner'
import { useCounselor } from '@/hooks/useCounselor'
import MainLayout from '@/layouts/Main'

export default function Profile() {
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
      <ProfileDetail />
      <EmptyChat />
    </MainLayout>
  )
}
