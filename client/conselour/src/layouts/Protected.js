import { verifyUser } from "@/helpers"
import { useCounselor } from "@/hooks/useCounselor"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Protected({ children }) {
  const { setCounselor } = useCounselor()
  const router = useRouter()
  useEffect(() => {
    verifyUser().then(user => {
      if (user) setCounselor(user)
      else router.push('/pending')
    }).catch(() => {})
  })
  return (
    <>
      {children}
    </>
  )
}
