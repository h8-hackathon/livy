import EmptyChat from '@/components/EmptyChat'
import ProfileActivity from '@/components/ProfileActivity'
import MainLayout from '@/layouts/Main'
import { useRouter } from 'next/router'
import React from 'react'

export default function Pending() {
  const router = useRouter()

  return (
    <MainLayout >
      <ProfileActivity />
      <EmptyChat title="Your submission is waiting approval"  subtitle="In the meantime please edit your submission" />
    </MainLayout>
  )
}
