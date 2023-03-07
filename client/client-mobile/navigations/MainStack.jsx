import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import MainTab from './MainTab'
import Login from '../screens/Login'
import LivyChat from '../screens/LivyChat'
import StartThread from '../screens/StartThread'
import ForumPostDetail from '../screens/ForumPostDetail'
import CounselorPorfile from '../screens/CounselorProfile'
import Success from '../screens/Success'

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

      <Stack.Screen
        name='LivyChat'
        options={{
          headerShown: false,
        }}
        component={LivyChat}
      />
      <Stack.Screen
        name='StartThread'
        options={{
          headerShown: false,
        }}
        component={StartThread}
      />
      <Stack.Screen
        name='ForumPostDetail'
        options={{
          headerShown: false,
        }}
        component={ForumPostDetail}
      />
      <Stack.Screen
        name='CounselorProfile'
        options={{
          headerShown: false,
        }}
        component={CounselorPorfile}
      />
      <Stack.Screen
        name='Success'
        options={{
          headerShown: false,
        }}
        component={Success}
      />
    </Stack.Navigator>
  )
}
