import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { FlatList } from 'react-native'
import { View, Image, ScrollView } from 'react-native'
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper'
import think from '../assets/pages/Thinking.png'

const ForumCard = ({ title, description, author, date }) => {
  return (
    <View
      style={{
        backgroundColor: '#fefefe',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#eee',
        borderWidth: 2,
        shadowColor: useTheme().colors.primary,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
      }}
    >
      <View>
        <Text style={{ color: '#555', fontSize: 18, fontWeight: 'bold' }}>
          {title}
        </Text>
        <Text style={{ color: '#555', fontSize: 10, color: '#444' }}>
          {date.toLocaleDateString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={{ color: '#555', fontSize: 12 }}>{description}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Ionicons
              name='heart-outline'
              size={10}
              color={useTheme().colors.secondary}
            />
            <Text style={{ fontSize: 10 }}>20</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Ionicons
              name='chatbox-ellipses-outline'
              size={10}
              color={useTheme().colors.primary}
            />
            <Text style={{ fontSize: 10 }}>5</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Ionicons
              name='person-outline'
              size={10}
              color={useTheme().colors.primary}
            />
            <Text style={{ color: '#555', fontSize: 12 }}>{author}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const forumList = [
  {
    title: 'How to get a job',
    description: 'I need help getting a job',
    author: 'Livy',
    date: new Date(),
  },
  {
    title: 'How to get a job',
    description: 'I need help getting a job',
    author: 'Livy',
    date: new Date(),
  },
  {
    title: 'How to get a job',
    description: 'I need help getting a job',
    author: 'Livy',
    date: new Date(),
  },
  {
    title: 'How to get a job',
    description: 'I need help getting a job',
    author: 'Livy',
    date: new Date(),
  },
]

export default function Forum() {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={{ paddingVertical: 10, paddingBottom: 24 }}>
        <View
          style={{
            backgroundColor: '#fefefe',
            paddingVertical: 12,
            paddingHorizontal: 15,
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: '#eee',
            borderWidth: 2,
          }}
        >
          <Text style={{ color: '#555', fontSize: 12 }}>
            Search Forum Post...
          </Text>
          <Ionicons name='search' />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={think} style={{ height: 200, aspectRatio: 0.62 }} />
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', gap: 10, padding: 10 }}
          >
            <Text style={{ textAlign: 'center' }}>
              Punya hal yang ingin disampaikan? Jangan ragu untuk mulai cerita
              di forum ini.
            </Text>
            <Button
              mode='contained'
              icon='book'
              textColor='#444'
              buttonColor={useTheme().colors.secondary}
            >
              Start a Thread
            </Button>
          </View>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', gap: 25 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: useTheme().colors.primary,
              }}
            >
              Top Forum
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Post Terbaru
            </Text>
          </View>
        </View>
        <Divider />
        <View style={{ paddingBottom: 120, gap: 12 }}>
          {forumList.map((item, i) => (
            <ForumCard
              key={i}
              title={item.title}
              description={item.description}
              author={item.author}
              date={item.date}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
