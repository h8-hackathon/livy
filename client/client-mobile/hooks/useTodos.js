import { atom, useAtom } from 'jotai'
import { api } from '../helpers/axios'
import { useUser } from './useUser'

const atomtodos = atom([])
export const useTodos = () => {
  const [todos, _setTodos] = useAtom(atomtodos)
  const { user } = useUser()
  const updateTodos = async () => {
    if (!user) return
    try {
      const { data } = await api.get('/daily/todos/' + user.id)
      _setTodos(data.todos)
    } catch (error) {
      console.log(error)
    }
  }

  const setTodos = (todos) => {
    _setTodos(todos)
    api.put('/daily/todos/' + user.id, { todos }).catch((error) => {
      console.log(error)
    })
  }
  return { todos, setTodos, updateTodos }
}
