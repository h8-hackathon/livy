import { Image, ScrollView, TextInput, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { api } from '../helpers/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function StartThread() {
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const navigation = useNavigation()
  const [show, setShow] = useState(false)

  navigation.addListener('focus', async () => {
    const access_token = await AsyncStorage.getItem('access_token')
    if (!access_token) {
      navigation.navigate('Account')
    } else {
      setShow(true)
      setTitle('')
      setCaption('')
    }
  })

  const submit = async () => {
    console.log({
      title,
      caption,
    })
    try {
      const access_token = await AsyncStorage.getItem('access_token')
      const result = await api.post(
        '/client/forum/post',
        {
          title,
          caption,
        },
        {
          headers: {
            access_token,
          },
        }
      )
      console.log(result)
      navigation.goBack()
    } catch (err) {
      console.log(err)
    }
  }

  if (!show) return null
  return (
    <>
      <SafeAreaView />
      <ScrollView
        style={{ padding: 10, gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Image
            source={require('../assets/pages/Thinking.png')}
            style={{ height: 200, aspectRatio: 0.623 }}
          />
        </View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 10 }}>
          Title
        </Text>
        <TextInput
          numberOfLines={1}
          style={{
            borderWidth: 0.5,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            fontSize: 15,
            fontWeight: 'bold',
          }}
          placeholder='A title for your thread...'
          onChangeText={setTitle}
        />

        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 10 }}>
          Content
        </Text>
        <TextInput
          numberOfLines={5}
          multiline={true}
          style={{
            borderWidth: 0.5,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            fontSize: 15,
            textAlign: 'left',
            verticalAlign: 'top',
            marginBottom: 20,
          }}
          placeholder='Write your question here...'
          onChangeText={setCaption}
        />
        <Button icon='book' mode='contained' textColor='#fff' onPress={submit}>
          Submit Post
        </Button>
      </ScrollView>
    </>
  )
}
