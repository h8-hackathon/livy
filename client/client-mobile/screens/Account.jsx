import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { View, Text } from 'react-native'
import Login from './Login'
export default function Account(props) {
  const { user } = useUser()
  const navigate = useNavigation()

  props.navigation.addListener('focus', () => {
    
  })
  
  if(!user) return <Login />
  return (
    <View>
      <Text>Account</Text>
    </View>
  )
}
