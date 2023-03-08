import { Ionicons } from '@expo/vector-icons'
import { FlatList, Image, ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Text, useTheme, Snackbar } from 'react-native-paper'
import { TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '../hooks/useUser'
import Login from './Login'
import { useEffect, useRef, useState } from 'react'
import socketClient from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '../helpers/axios'
import { useNavigation } from '@react-navigation/native'

const MeChatBubble = ({ message }) => {
  const theme = useTheme()
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom: 15,
      }}
    >
      <View style={{ alignItems: 'flex-end', width: '100%' }}>
        <View
          style={{
            backgroundColor: theme.colors.primary,
            padding: 10,
            borderRadius: 10,
            maxWidth: '70%',
          }}
        >
          <Text style={{ color: '#fff' }}>{message.text}</Text>
        </View>

        <Text style={{ paddingHorizontal: 5, fontSize: 10 }}>
          {new Date(message.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  )
}

const OtherChatBubble = ({ message }) => {
  const theme = useTheme()
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginBottom: 15,
      }}
    >
      <View style={{ alignItems: 'flex-start', width: '100%' }}>
        <View
          style={{
            backgroundColor: '#eee',
            padding: 10,
            borderRadius: 10,
            maxWidth: '70%',
          }}
        >
          <Text>{message.text}</Text>
        </View>

        <Text style={{ paddingHorizontal: 5, fontSize: 10 }}>
          {new Date(message.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  )
}

const Profile = ({ name }) => {
  const theme = useTheme()
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        height: 70,
      }}
    >
      <View
        style={{
          height: 30,
          width: 30,
          backgroundColor: '#aaa',
          borderRadius: 100,
        }}
      ></View>
      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
        <Text>{name}</Text>
        {/* <Ionicons
          name='ios-checkmark-circle'
          size={15}
          color={theme.colors.primary}
        /> */}
      </View>
    </View>
  )
}
export default function LivyChat(props) {
  const ref = useRef()
  const theme = useTheme()
  const { user } = useUser()
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [focus, setFocus] = useState(false)
  const [waring, setWarning] = useState(false)
  const [done, setDone] = useState(false)
  const counselor = props.route.params?.Counselor
  const session = props.route.params?.session
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const sendMessage = () => {
    if (text && !counselor?.id) {
      AsyncStorage.getItem('access_token').then((access_token) => {
        setMessages([
          ...messages,
          {
            text,
            time: new Date().toISOString(),
            sender: { UserId: user.id, name: user.name },
          },
        ])
        setText('')
        if (access_token) {
          ref.current?.scrollToEnd()
          api
            .post(
              '/client/chatLivy',
              { text },
              {
                headers: {
                  access_token,
                },
              }
            )
            .then((res) => {
              const { message } = res.data
              setMessages([
                ...messages,
                {
                  text,
                  time: new Date().toISOString(),
                  sender: { UserId: user.id, name: user.name },
                },
                { text: message, time: new Date().toISOString() },
              ])
              setText('')
            })
            .catch((err) => {
              console.log(err)
            })
            .finally(() => {
              ref.current?.scrollToEnd()
            })
        }
      })
    }

    if (socket && text) {
      socket.emit('message', `${counselor?.id}-${user.id}`, {
        text,
        sender: {
          UserId: user.id,
          name: user.name,
        },
      })
      setText('')
    }
  }

  const fetchMessages = () => {
    api
      .get('/client/chatLivy')
      .then((res) => {
        console.log(res.data)
        setMessages(res.data.chats.slice(-10))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        ref.current?.scrollToEnd()
      })
  }

  navigation.addListener('focus', () => {
    setFocus(true)
  })

  navigation.addListener('blur', () => {
    setFocus(false)
  })

  useEffect(() => {
    console.log(user, counselor?.id, focus)
    if (user && counselor?.id && focus) {
      api.get('/client/chat/' + counselor?.id).then((res) => {
        console.log(res.data)
        setMessages(res.data.chats)
        setTimeout(() => {
          ref.current.scrollToEnd()
        }, 100)
      }).catch((err) => {
        console.log(err)
      })
      const socket = socketClient('https://api.livy.chat')
      socket.auth = { access_token: user.access_token }
      setSocket(socket)

      socket.on('connect', () => {
        console.log('connected')
        socket.emit('join', `${counselor?.id}-${user.id}`, (error) => {
          if (!error) {
            // ini kalo roomnya ada / sesuai schedule
            // setJoined(true)
            return
          }

          // error bentuknya string
          console.error(error)
        })
        socket.on('message', (data) => {
          console.log(data)
          data.time = new Date()
          setMessages((messages) => [...messages, data])
          ref.current.scrollToEnd()
          // setLastIndex(messages.length)
        })
      })
    }

    if (!counselor) {
      fetchMessages()
    }

    let interval = setInterval(() => {
      const endTime = new Date(session).setHours(
        new Date(session).getHours() + 1
      )
      const warn = new Date(session).setMinutes(
        new Date(session).getMinutes() + 55
      )
      const now = new Date().getTime()
      if (now > warn && !waring) {
        setWarning(true)
        setVisible(true)
      }
      const isDone = now > endTime
      if (isDone) {
        setDone(true)
        setVisible(false)
      }
    }, 1000)

    return () => {
      if (socket) {
        socket.disconnect()
        setSocket(null)
        setMessages([])
      }
      clearInterval(interval)
    }
  }, [user, counselor, focus])

  const onDismissSnackBar = () => setVisible(false)
  if (!user) return <Login />
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: '#eee' }} />
      <View style={{ flex: 1 }}>
        <Profile name={counselor?.name || 'Livy'} />
        <FlatList
          ref={ref}
          style={{ flex: 1, padding: 10 }}
          data={messages}
          renderItem={({ item }) => {
            if (item.sender?.UserId === user.id) {
              return <MeChatBubble message={item} />
            } else {
              return <OtherChatBubble message={item} />
            }
          }}
          keyExtractor={(item, i) => i}
        />
      </View>
      {done ? (
        <View
          style={{
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.5,
          }}
        >
          <Text>Mohon maaf! Sesi ini telah berakhir</Text>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: 70,
            backgroundColor: '#eee',
            padding: 10,
          }}
        >
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Tutup',
            }}
            elevation={10}
            style={{
              backgroundColor: '#eee',
              position: 'absolute',
              bottom: 0,
              width: '95%',
              zIndex: 100,
              transform: [{ translateY: -70 }],
            }}
          >
            <Text>
              Sesi berakhir dalam{' '}
              {Math.max(
                Math.floor(
                  (new Date(session).setHours(
                    new Date(session).getHours() + 1
                  ) -
                    new Date().getTime()) /
                    60000
                ),
                1
              )}{' '}
              menit!
            </Text>
          </Snackbar>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#fff',
              borderRadius: 20,
            }}
          >
            <TextInput
              mode=''
              placeholder='Your message...'
              style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 10 }}
              underlineColor='transparent'
              onChangeText={setText}
              onSubmitEditing={sendMessage}
              value={text}
            />

            <TouchableOpacity
              style={{
                alignItems: 'center',
                height: 40,
                justifyContent: 'center',
                alignContent: 'center',
                width: 60,
              }}
              onPress={sendMessage}
            >
              <Ionicons name='ios-paper-plane-outline' size={20} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}
