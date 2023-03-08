import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { api } from '../helpers/axios'
import { dayToDate, getAllHours } from '../helpers/dayToDate'
import { useUser } from '../hooks/useUser'
import * as WebBrowser from 'expo-web-browser'

export default function CounselorPorfile(props) {
  const theme = useTheme()
  const { counselorId } = props.route.params
  const [counselor, setCounselor] = useState(null)
  const [slots, setSlots] = useState(null)
  const [selectedHours, setSelectedHours] = useState(null)
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  console.log(props)
  const fetchCounselor = async () => {
    try {
      const response = await api.get(`/client/counselors/${counselorId}`)
      setCounselor(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createSchedule = async () => {
    setLoading(true)
    try {
      if (selectedHours === null) return
      if (!user) {
        navigation.navigate('Login')
        return
      }
      const date = dayToDate(slots.dayOfWeek)
      const hours = selectedHours.split(':')[0]
      date.setHours(hours)
      date.setMinutes(0)
      date.setSeconds(0)
      const response = await api.post('/client/schedule', {
        CounselorId: +counselorId,
        time: date,
      })

      const { data } = response
      console.log(data.paymentUrl)
      const { paymentUrl } = data
      const result = await WebBrowser.openAuthSessionAsync(paymentUrl)

      console.log(result)
      // navigation.navigate('Schedule')

      const { data: schedules } = await api.get('/client/schedule')
      const schedule = schedules.find((s) => s.paymentUrl === paymentUrl)
      if (schedule.status === 'unpaid') {
        navigation.navigate('Schedule')
      }

      if (schedule.status === 'paid') {
        navigation.navigate('Success', { schedule })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (counselorId) {
      fetchCounselor()
    }

    return () => {
      setCounselor(null)
    }
  }, [counselorId])

  if (!counselor) {
    return null
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View
            style={{ width: '100%', alignItems: 'center', paddingVertical: 20 }}
          >
            <Image
              style={{ width: 100, height: 100, borderRadius: 100 }}
              source={{ uri: counselor.counselor.User.image }}
            />
          </View>
          <View
            style={{
              paddingVertical: 10,
              // paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Ionicons
                  name='star'
                  size={12}
                  color={theme.colors.secondary}
                />
                <Ionicons
                  name='star'
                  size={12}
                  color={theme.colors.secondary}
                />
                <Ionicons
                  name='star'
                  size={12}
                  color={theme.colors.secondary}
                />
                <Ionicons
                  name='star'
                  size={12}
                  color={theme.colors.secondary}
                />
                <Ionicons
                  name='star-outline'
                  size={12}
                  color={theme.colors.secondary}
                />
              </View>
              <Text
                style={{ fontSize: 20, fontVariant: 'headlineMedium' }}
                ellipsizeMode='tail'
                numberOfLines={1}
              >
                {counselor.counselor.User.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontVariant: 'headlineMedium',
                  opacity: 0.5,
                }}
                ellipsizeMode='tail'
                numberOfLines={1}
              >
                {counselor.counselor.User.email}
              </Text>
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  height: 110,
                  width: '100%',
                  marginTop: 10,
                  borderTopStartRadius: 20,
                  borderTopEndRadius: 20,
                  alignItems: 'center',
                  // justifyContent: 'space-evenly',
                  flexDirection: 'row',
                  paddingBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#009973',
                      padding: 10,
                      borderRadius: 100,
                      // opacity: 0.7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name='cash' size={15} color='#fff' />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}
                    >
                      Hourly Rates
                    </Text>
                    <Text style={{ color: '#fff' }}>
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(counselor.counselor.rate)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#009973',
                      padding: 10,
                      borderRadius: 100,
                      // opacity: 0.7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name='location' size={15} color='#fff' />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}
                    >
                      Join Us
                    </Text>
                    <Text style={{ color: '#fff' }}>
                      {new Date(
                        counselor.counselor.createdAt
                      ).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  position: 'relative',
                  backgroundColor: '#fefefe',
                  width: '100%',
                  borderTopEndRadius: 20,
                  borderTopStartRadius: 20,
                  zIndex: 10,
                  transform: [{ translateY: -20 }],
                }}
              >
                <View
                  style={{
                    //! REMOVE LATER
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      paddingVertical: 20,
                    }}
                  >
                    About
                  </Text>
                  <Text>{counselor.counselor.submissions}</Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      paddingVertical: 20,
                    }}
                  >
                    Appointment
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {counselor.availability.availability.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            { fontWeight: 'bold', fontSize: 12 },
                            {
                              width: 60,
                              aspectRatio: 0.7,
                              backgroundColor: '#eee',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 10,
                              marginRight: 10,
                            },
                            slots &&
                              slots.dayOfWeek === item.dayOfWeek && {
                                backgroundColor: theme.colors.primary,
                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 3,
                                },
                                shadowOpacity: 0.29,
                                shadowRadius: 4.65,

                                elevation: 7,
                              },
                          ]}
                          onPress={() => {
                            setSlots(item)
                            setSelectedHours(null)
                          }}
                        >
                          <Text
                            style={[
                              slots &&
                                slots.dayOfWeek === item.dayOfWeek && {
                                  color: '#fff',
                                },
                            ]}
                          >
                            {item.dayOfWeek[0].toUpperCase()}
                            {item.dayOfWeek.slice(1, 3)}
                          </Text>
                          <Text
                            style={[
                              { fontWeight: 'bold', fontSize: 18 },
                              slots &&
                                slots.dayOfWeek === item.dayOfWeek && {
                                  color: '#fff',
                                },
                            ]}
                          >
                            {dayToDate(item.dayOfWeek).getDate()}
                          </Text>
                        </TouchableOpacity>
                      )
                    })}
                  </ScrollView>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        paddingVertical: 20,
                      }}
                    >
                      Schedule
                    </Text>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {/* {slots && (getAllHours(slots.slots))} */}
                    {slots &&
                      getAllHours(slots.slots).map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={[
                              {
                                backgroundColor: '#eee',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5,
                                marginRight: 10,
                                width: 60,
                                height: 20,
                              },
                              selectedHours === item && {
                                backgroundColor: theme.colors.primary,
                                shadowColor: '#000',
                              },
                            ]}
                            onPress={() => {
                              // setSchedule({
                              //   ...schedule,
                              //   date: slots.dayOfWeek,
                              //   time: item,
                              // })
                              setSelectedHours(item)
                            }}
                          >
                            <Text
                              style={[
                                { fontWeight: 'bold', fontSize: 12 },
                                {
                                  color:
                                    selectedHours === item ? '#fff' : '#000',
                                },
                              ]}
                            >
                              {item}
                            </Text>
                          </TouchableOpacity>
                        )
                      })}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <Button
          onPress={createSchedule}
          mode='contained'
          textColor='#fff'
          buttonColor={
            selectedHours === null || loading
              ? '#aaa'
              : theme.colors.secondary
          }
          style={{
            borderRadius: 10,
          }}
          // disabled={selectedHours === null}
          loading={loading}
        >
          Make Appointment
        </Button>
      </View>
    </View>
  )
}
