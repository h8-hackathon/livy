import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, Image, Text } from 'react-native'
import { useTheme, Button } from 'react-native-paper'

export default function Success() {
  const theme = useTheme()
  const navigate = useNavigation()
  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.primary, width: '100%', padding: 20 }}
    >
      <View style={{ flex: 1, justifyContent: 'space-evenly'}}>
        <Text style={styles.text}>Your payment has been received.</Text>
        <Image source={require('../assets/pages/People.png')} style={styles.images} />
      </View>
      <Button
        mode='contained'
        icon='calendar'
        style={styles.button}
        onPress={() => {
          navigate.navigate('Schedule')
        }}
        textColor='#fefefe'
        buttonColor={theme.colors.secondary}
      >
        Go To Schedule
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
    color: '#fefefe',
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
