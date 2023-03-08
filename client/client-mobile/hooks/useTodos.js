import { atom, useAtom } from 'jotai'
import { api } from '../helpers/axios'
import { useUser } from './useUser'

const atomtodos = atom([])
export const useTodos = () => {
  const [todos, setTodos] = useAtom(atomtodos)
  const { user } = useUser()
  const updateTodos = async () => {
    if (!user) return
    try {
      const { data } = await api.get('/daily/todos/')
      setTodos(data)
    } catch (error) {
      console.log(error)
    }
  }
  return { todos, setTodos, updateTodos }
}
