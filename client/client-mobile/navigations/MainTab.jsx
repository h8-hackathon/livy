import * as React from 'react'
import { SafeAreaView, Text, Touchable, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, TextInput, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import HomeScreen from '../screens/Home'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import Login from '../screens/Login'
import Forum from '../screens/Forum'

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()

export default function MainTab() {
  const navigation = useNavigation()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: '#eee',
          borderTopWidth: 0,
        },
        tabBarItemStyle: { paddingVertical: 8 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name='Home'
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? `ios-home` : `ios-home-outline`}
              size={size}
              color={color}
            />
          ),
          tabBarShowLabel: true,
          tabBarHideOnKeyboard: true,
          // headerShown: false,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name='Schedule'
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? `ios-calendar` : `ios-calendar-outline`}
              size={size}
              color={color}
            />
          ),
          tabBarShowLabel: true,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name='Chat'
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='comments-o' color={color} size={size} />
          ),
          tabBarShowLabel: false,
          // tabBarItemStyle: {
          //   position: 'relative',
          //   backgroundColor: useTheme().colors.secondary,
          //   borderRadius: 50,
          // },
          tabBarButton: () => {
            return (
              <TouchableOpacity
                style={{
                  position: 'relative',
                  height: 60,
                  width: 60,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ translateY: -25 }],
                  backgroundColor: useTheme().colors.secondary,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}
                onPress={() => navigation.navigate('LivyChat')}
              >
                <Ionicons
                  name={`ios-chatbubbles-outline`}
                  size={25}
                  color={'#fff'}
                />
              </TouchableOpacity>
            )
          },
        }}
        component={SettingsScreen}
      />
      <Tab.Screen
        name='Forum'
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? `ios-people` : `ios-people-outline`}
              size={size}
              color={color}
            />
          ),
          tabBarShowLabel: true,
          headerShown: false,
        }}
        component={Forum}
      />
      <Tab.Screen
        name='Account'
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? `ios-person-circle` : `ios-person-circle-outline`}
              size={size}
              color={color}
              onPress={() => navigation.navigate('Login')}
            />
          ),
          tabBarShowLabel: true,
        }}
        component={HomeScreen}
      />
    </Tab.Navigator>
  )
}
