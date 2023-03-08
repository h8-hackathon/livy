import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { api } from '../../helpers/axios'
import { useUser } from '../../hooks/useUser'

export default function MainLayouts({ children }) {
  const [loading, setLoading] = useState(true)
  const { setUser } = useUser()

  const verify = async () => {
    setLoading(true)
    const access_token = await AsyncStorage.getItem('access_token')
    if (access_token) {
      const response = await api.post('/verify', {
        access_token,
      })

      setUser({ ...response.data, access_token })
    }
    setLoading(false)
  }

  useEffect(() => {
    verify()
  }, [])
  if (loading) return null
  return <>{children}</>
}
