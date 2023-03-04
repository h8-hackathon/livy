import { Ionicons } from '@expo/vector-icons'
import { FlatList, Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Text, useTheme } from 'react-native-paper'
import { TextInput } from 'react-native'

const me = 123

const messages = [
  {
    id: 1,
    time: '2021-05-01T12:00:00.000Z',
    message: 'Hello',
    sender: 123,
  },
  {
    id: 2,
    time: '2021-05-01T12:00:00.000Z',
    message: 'Hi',
    sender: 456,
  },
  {
    id: 3,
    time: '2021-05-01T12:00:00.000Z',
    message: 'How are you?',
    sender: 123,
  },
  {
    id: 4,
    time: '2021-05-01T12:00:00.000Z',
    message: 'I am fine, thank you',
    sender: 456,
  },
  {
    id: 5,
    time: '2021-05-01T12:00:00.000Z',
    message: 'What about you?',
    sender: 123,
  },
  {
    id: 6,
    time: '2021-05-01T12:00:00.000Z',
    message: 'I am also fine',
    sender: 456,
  },
  {
    id: 7,
    time: '2021-05-01T12:00:00.000Z',
    message: 'Where are you from?',
    sender: 123,
  },
  {
    id: 8,
    time: '2021-05-01T12:00:00.000Z',
    message: 'I am from India',
    sender: 456,
  },
  {
    id: 9,
    time: '2021-05-01T12:00:00.000Z',
    message: 'How is the weather there?',
    sender: 123,
  },
  {
    id: 10,
    time: '2021-05-01T12:00:00.000Z',
    message: 'It is very hot here',
    sender: 456,
  },
  {
    id: 11,
    time: '2021-05-01T12:00:00.000Z',
    message: 'Where do you live?',
    sender: 123,
  },
  {
    id: 12,
    time: '2021-05-01T12:00:00.000Z',
    message: 'I live in New York',
    sender: 456,
  },
  {
    id: 13,
    time: '2021-05-01T12:00:00.000Z',
    message: 'Have you been to India?',
    sender: 123,
  },
  {
    id: 14,
    time: '2021-05-01T12:00:00.000Z',
    message: 'No, I have never been to India',
    sender: 456,
  },
  {
    id: 15,
    time: '2021-05-01T12:00:00.000Z',
    message: 'Would you like to visit India?',
    sender: 123,
  },
  {
    id: 16,
    time: '2021-05-01T12:00:00.000Z',
    message: 'Yes, I would like to visit India',
    sender: 456,
  },
]

const MeChatBubble = ({ message }) => {
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
            backgroundColor: useTheme().colors.primary,
            padding: 10,
            borderRadius: 10,
            maxWidth: '70%',
          }}
        >
          <Text style={{ color: '#fff' }}>{message.message}</Text>
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
          <Text>{message.message}</Text>
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

const Profile = () => {
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
        <Text>Livy</Text>
        {/* <Ionicons
          name='ios-checkmark-circle'
          size={15}
          color={useTheme().colors.primary}
        /> */}
      </View>
    </View>
  )
}
export default function LivyChat() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Profile />
        <FlatList
          style={{ flex: 1, padding: 10 }}
          data={messages}
          renderItem={({ item }) => {
            if (item.sender === me) {
              return <MeChatBubble message={item} />
            } else {
              return <OtherChatBubble message={item} />
            }
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: 70,
          backgroundColor: '#eee',
          padding: 10,
        }}
      >
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
          />
          <TouchableOpacity
            style={{
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
              alignContent: 'center',
              width: 60,
            }}
          >
            <Ionicons name='ios-paper-plane-outline' size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
