import { atom, useAtom } from 'jotai'
import { api } from '../helpers/axios'

const atomSchedule = atom([])
export const useSchedules = () => {
  const [schedule, setSchedule] = useAtom(atomSchedule)
  const updateSchedule = async () => {
    try {
      const { data } = await api.get('/client/schedule')
      setSchedule(data)
    } catch (error) {
      console.log(error)
    }
  }
  return { schedule, setSchedule, updateSchedule }
}
