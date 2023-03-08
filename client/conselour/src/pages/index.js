import EmptyChat from '@/components/EmptyChat'
import Sidebar from '@/components/Sidebar'
import Spinner from '@/components/Spinner'
import { useCounselor } from '@/hooks/useCounselor'
import MainLayout from '@/layouts/Main'

export default function Home() {
  const { counselor } = useCounselor()

  if (!counselor) {
    return (
      <div className="flex h-screen animate-ping items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <MainLayout>
      <Sidebar />
      <EmptyChat />
    </MainLayout>
  )
}
