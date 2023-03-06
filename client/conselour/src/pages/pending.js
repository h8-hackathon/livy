import { useRouter } from 'next/router'
import React from 'react'

export default function Pending() {
  const router = useRouter()
  const logout  = () => {
    localStorage.clear()
    router.push('/login')
  }
  return (
    <>
      <div>pending</div>
      <button onClick={logout}>logout</button>
    </>
  )
}
