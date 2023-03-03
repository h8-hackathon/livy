import { StyleSheet, Text, View, Image } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { useEffect, useState } from 'react'
import talk from '../assets/pages/talk.png'
import { Button } from 'react-native-paper'
import axios from 'axios'

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '662974395385-up045riubc0lga2i5f8mpg086tv3kmh1.apps.googleusercontent.com',
    androidClientId:
      '662974395385-up045riubc0lga2i5f8mpg086tv3kmh1.apps.googleusercontent.com',
    iosClientId:
      '662974395385-up045riubc0lga2i5f8mpg086tv3kmh1.apps.googleusercontent.com',
  })

  useEffect(() => {
    if (response?.type === 'success') {
      console.log(response.authentication.accessToken)
      axios
        .post('https://bceb-114-124-240-220.ngrok.io/users', {
          token: response.authentication.accessToken,
          role: 'admin',
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [response])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>We want get to know you better.</Text>
      <Image source={talk} style={styles.images} />
      <Button
        mode='contained'
        icon='google'
        style={styles.button}
        disabled={!request}
        onPress={() => {
          promptAsync()
        }}
        textColor='#fefefe'
        buttonColor='#4285F4'
      >
        Sign in with Google
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 20,
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  images: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
    maxWidth: 400,
  },
  header: {
    backgroundColor: '#fefefe',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#fefefe',
  },
  button: {
    borderRadius: 10,
    maxWidth: 400,
  },
})
