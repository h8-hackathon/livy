import EmptyChat from '@/components/EmptyChat'
import ProfileActivity from '@/components/ProfileActivity'
import { useCounselor } from '@/hooks/useCounselor'
import MainLayout from '@/layouts/Main'
import React from 'react'

export default function Pending() {
  const { counselor } = useCounselor()

  // if (!counselor) return null
  
  return (
    <MainLayout >
      <ProfileActivity pending={true} />
      <EmptyChat title="Your submission is waiting approval"  subtitle="In the meantime please edit your submission" />
    </MainLayout>
  )
}
