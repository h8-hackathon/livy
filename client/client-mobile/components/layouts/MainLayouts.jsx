import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { api } from '../../helpers/axios'
import { useUser } from '../../hooks/useUser'

export default function MainLayouts({ children }) {
  const { setUser } = useUser()

  const verify = async () => {
    const access_token = await AsyncStorage.getItem('access_token')
    if (access_token) {
      const response = await api.post('/verify', {
        access_token,
      })

      setUser({ ...response.data, access_token })
    }
  }

  useEffect(() => {
    verify()
  }, [])
  return <>{children}</>
}
