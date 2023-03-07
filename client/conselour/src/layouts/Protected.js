import { api, verifyUser } from "@/helpers"
import { useCounselor } from "@/hooks/useCounselor"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Protected({ children }) {
  const { setCounselor } = useCounselor()
  const router = useRouter()
  useEffect(() => {
    verifyUser().then(async user => {
        if (!user) router.push('/pending')
        setCounselor(user)
    }).catch((err) => {
        router.push('/login')
    })
  }, [])
  return (
    <>
      {children}
    </>
  )
}
