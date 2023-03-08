import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  Touchable,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTodos } from '../hooks/useTodos'

export default function Todo() {
  const { todos, updateTodos, setTodos } = useTodos()

  useEffect(() => {
    updateTodos()
  }, [])

  return (
    <>
      <SafeAreaView />
      <ScrollView style={{ padding: 20 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/pages/hiking.jpg')}
            style={{
              height: Dimensions.get('window').height * 0.3,
              aspectRatio: 1.5,
            }}
          />
        </View>
        <View style={{ marginVertical: 20 }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
            }}
          >
            Ini ada beberapa daily task yang diberikan oleh Livy untuk kamu agar
            membantu menaikan mood dan semangatmu!
          </Text>
        </View>
        <View style={{}}>
          {todos.map((todo, index) => (
            <TouchableWithoutFeedback
              onPress={() => {
                const _todos = [...todos]
                _todos[index].completed = !_todos[index].completed
                setTodos(_todos)
              }}
              key={index}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  padding: 10,
                  backgroundColor: '#eee',
                  gap: 5,
                  borderRadius: 10,
                  paddingHorizontal: 20,
                  opacity: todo.completed ? 0.5 : 1,
                }}
              >
                {todo.completed ? (
                  <Ionicons name='checkmark' size={24} color='black' />
                ) : (
                  <Ionicons name='square-outline' size={24} color='black' />
                )}
                <Text style={{ fontWeight: 'bold' }}>{todo.activity}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </>
  )
}
