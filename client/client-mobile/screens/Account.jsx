import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { View, Text } from 'react-native'
import Login from './Login'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Account(props) {
  const { user, setUser } = useUser()
  const navigate = useNavigation()

  props.navigation.addListener('focus', () => {})

  if (!user) return <Login />
  return (
    <>
      <SafeAreaView />
      <View>
        <Text>Account</Text>
        <Button
          onPress={() => {
            AsyncStorage.removeItem('access_token')
            setUser(null)
          }}
          mode='contained'
        >
          Logout
        </Button>
      </View>
    </>
  )
}
