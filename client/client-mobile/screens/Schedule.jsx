import React, { useEffect, useState } from 'react'
import {
  View,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Divider, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { api } from '../helpers/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CounselorCard from '../components/CounselorCard'
import { Ionicons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import { useUser } from '../hooks/useUser'

const ScheduleCard = ({ Counselor, session, status, paymentUrl }) => {
  const theme = useTheme()
  const navigation = useNavigation()
  const pay = async () => {
    try {
      await WebBrowser.openAuthSessionAsync(paymentUrl)
      navigation.navigate('Schedule')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        gap: 10,
        marginVertical: 5,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LivyChat', { Counselor })
        }}
        style={{
          padding: 15,
          backgroundColor: 'white',
          borderRadius: 20,
          flexDirection: 'row',
          height: 130,
          gap: 10,
          marginVertical: 5,
        }}
      >
        <Image
          source={{ uri: Counselor.image || 'https://picsum.photos/800/450' }}
          style={{
            flex: 2,
            borderRadius: 10,
          }}
        />

        <View style={{ flex: 5, justifyContent: 'flex-start', gap: 4 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {new Date(session).toLocaleString('id-ID', {
              month: 'long',
              day: 'numeric',
              weekday: 'long',
              year: 'numeric',
            })}
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {new Date(session).toLocaleString('id-ID', {
              hour: 'numeric',
              minute: 'numeric',
              timeStyle: 'full',
            })}
          </Text>
          <Text style={{ fontSize: 11.5, color: 'gray' }}>
            {Counselor.name}
          </Text>

          <View
            style={{
              backgroundColor:
                status === 'unpaid'
                  ? theme.colors.secondary
                  : theme.colors.primary,

              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              {status.toUpperCase()}
            </Text>
          </View>

          {/* <View style={{ alignItems: 'flex-end' }}>
          <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: theme.colors.secondary,
          }}
            onPress={() => {}}
            >
            <Text
            style={{
              fontSize: 10,
              lineHeight: 21,
              color: 'white',
            }}
            >
            Beri Penilaian
            </Text>
            </Pressable>
          </View> */}
        </View>
      </TouchableOpacity>
      {status === 'unpaid' && (
        <View
          style={{
            paddingBottom: 15,
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button onPress={pay} mode='contained' textColor='#fff'>
            Pay Now
          </Button>
        </View>
      )}
    </View>
  )
}

export default function Schedule() {
  const navigation = useNavigation()
  const theme = useTheme()
  const user = useUser()
  const [schedule, setSchedule] = useState([])
  const [counselors, setcounselors] = useState([])
  const [focus, setFocus] = useState(false)
  const fetchCounselors = async () => {
    const res = await api.get('/client/counselors')
    console.log(res.data)
    setcounselors(res.data)
  }
  const fetchSchedule = async () => {
    try {
      if (!user) return
      const response = await api.get('/client/schedule')
      console.log(response.data)
      setSchedule(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  navigation.addListener('focus', () => {
    setFocus(true)
  })

  navigation.addListener('blur', () => {
    setFocus(false)
  })

  useEffect(() => {
    if (focus) {
      fetchSchedule()
      fetchCounselors()
    }
  }, [focus])
  return (
    <>
      <SafeAreaView />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: '#eee',
          padding: 10,
        }}
      >
        {schedule.map((item, i) => {
          return <ScheduleCard key={i} {...item} />
        })}
        {counselors.length > 0 && (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: theme.colors.primary,
              marginVertical: 10,
              paddingTop: 10,
              paddingLeft: 10,
            }}
          >
            Konselor yang bisa kamu temui
          </Text>
        )}
        {counselors.map((counselor) => {
          return <CounselorCard {...counselor.User} key={counselor.id} />
        })}
        <Divider style={{ marginVertical: 20 }} />
      </ScrollView>
    </>
  )
}
