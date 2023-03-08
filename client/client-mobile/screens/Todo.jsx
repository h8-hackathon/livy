import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  Touchable,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import { Badge } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const _todos = [
  {
    activities: 'Hiking With Friends',
    completed: false,
  },
  {
    activities: 'Reading Books',
    completed: false,
  },
  {
    activities: 'Playing Games',
    completed: false,
  },
  {
    activities: 'Watching Movies',
    completed: false,
  },
  {
    activities: 'Going to the Gym',
    completed: false,
  },
]

export default function Todo() {
  const [todos, setTodos] = useState(_todos)
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
                <Text style={{ fontWeight: 'bold' }}>{todo.activities}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </>
  )
}
