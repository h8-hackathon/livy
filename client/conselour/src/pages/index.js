import EmptyChat from '@/components/EmptyChat'
import Sidebar from '@/components/Sidebar'
import { useCounselor } from '@/hooks/useCounselor'
import MainLayout from '@/layouts/Main'

export default function Home() {
  const { counselor } = useCounselor()

  if (!counselor) return null

  return (
    <MainLayout>
      <Sidebar />
      <EmptyChat />
    </MainLayout>
  )
}
