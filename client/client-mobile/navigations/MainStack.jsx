import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import MainTab from './MainTab'
import Login from '../screens/Login'

const Stack = createStackNavigator()

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName='MainTab'>
      <Stack.Screen
        name='MainTab'
        options={{
          headerShown: false,
        }}
        component={MainTab}
      />
      <Stack.Screen
        name='Login'
        options={{
          headerShown: false,
        }}
        component={Login}
      />
    </Stack.Navigator>
  )
}
