import { useNavigation, useTheme } from '@react-navigation/native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useEffect } from 'react/cjs/react.production.min'
import { api } from '../helpers/axios'

export default function CounselorPorfile(props) {
  const { counselorId } = props.route.params
  const [counselor, setCounselor] = useState(null)
  const navigation = useNavigation()
  console.log(props)
  const fetchCounselor = async () => {
    try {
      const response = await api.get(`/client/counselors/${counselorId}`)
      setCounselor(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createSchedule = async () => {
    try {
      const response = await api.post('/client/schedule', {
        CounselorId: +counselorId,
        time: new Date(),
      })
      navigation.navigate('Schedule')

      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   if (counselorId) {
  //     fetchCounselor()
  //   }

  //   return () => {
  //     setCounselor(null)
  //   }
  // }, [counselorId])

  // if (!counselor) {
  //   return null
  // }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: useTheme().colors.primary }}>
      <Text style={{ fontSize: 50 }}>{counselorId}</Text>
      <Button onPress={createSchedule} mode='contained'>
        Create Schedule
      </Button>
    </ScrollView>
  )
}
