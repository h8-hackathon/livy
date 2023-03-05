import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useEffect } from 'react'
import { useUser } from '../../hooks/useUser'

export default function MainLayouts({ children }) {
  const { setUser } = useUser()

  const verify = async () => {
    const access_token = await AsyncStorage.getItem('access_token')
    if (access_token) {
      const response = await axios.post('https://api.livy.chat/verify', {
        access_token,
      })

      setUser(response.data)
    }
  }

  useEffect(() => {
    verify()
  }, [])
  return <>{children}</>
}
