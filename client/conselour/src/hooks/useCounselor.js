import { atom, useAtom } from 'jotai'

const counselorAtom = atom(null)

export const useCounselor = () => {
  const [counselor, setCounselor] = useAtom(counselorAtom)

  return { counselor, setCounselor }
}
