import Chats from '@/components/Chats'
import ProfileDetail from '@/components/ProfileDetail'
import MainLayout from '@/layouts/Main'

export default function Profile() {
  return (
    <MainLayout side={<ProfileDetail />} children={<Chats />} />
  )
}
