import MainStack from './navigations/MainStack'
import Login from './screens/Login'
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer, Theme } from '@react-navigation/native'

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#008A68',
    secondary: '#F99417',
    background: '#fefefe',
  },
}

/**
 * 
Hijau: #008A68

Orange: #F99417
*/
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <MainStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  )
}
