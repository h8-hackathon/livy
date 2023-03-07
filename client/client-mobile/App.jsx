import MainStack from './navigations/MainStack'
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer, Theme } from '@react-navigation/native'
import { Provider } from 'jotai'
import MainLayouts from './components/layouts/MainLayouts'

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
    <Provider>
      <MainLayouts>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <NavigationContainer theme={theme}>
              <MainStack />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </MainLayouts>
    </Provider>
  )
}
