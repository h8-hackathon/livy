import { atom, useAtom } from 'jotai'

const userAtom = atom(null)

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom)
  return { user, setUser }
}
