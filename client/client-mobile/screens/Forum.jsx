import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper'
import think from '../assets/pages/Thinking.png'
import { api } from '../helpers/axios'
import { useNavigation } from '@react-navigation/native'

const ForumCard = ({ title, caption, author, date, helpful, id }) => {
  const theme = useTheme()
  const navigation = useNavigation()
  return (
    <TouchableOpacity
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
        shadowColor: theme.colors.primary,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
      }}
      onPress={() => navigation.navigate('ForumPostDetail', { postId: id })}
    >
      <View>
        <Text style={{ color: '#555', fontSize: 18, fontWeight: 'bold' }}>
          {title}
        </Text>
        <Text style={{ color: '#555', fontSize: 10, color: '#444' }}>
          {new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={{ color: '#555', fontSize: 12 }}>{caption}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Ionicons
              name='heart-outline'
              size={10}
              color={theme.colors.secondary}
            />
            <Text style={{ fontSize: 10 }}>{helpful}</Text>
          </View>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Ionicons
              name='chatbox-ellipses-outline'
              size={10}
              color={theme.colors.primary}
            />
            <Text style={{ fontSize: 10 }}>5</Text>
          </View> */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Ionicons
              name='person-outline'
              size={10}
              color={theme.colors.primary}
            />
            <Text style={{ color: '#555', fontSize: 12 }}>{author}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

// const forumList = [
//   {
//     title: 'How to get a job',
//     description: 'I need help getting a job',
//     author: 'Livy',
//     date: new Date(),
//   },
//   {
//     title: 'How to get a job',
//     description: 'I need help getting a job',
//     author: 'Livy',
//     date: new Date(),
//   },
//   {
//     title: 'How to get a job',
//     description: 'I need help getting a job',
//     author: 'Livy',
//     date: new Date(),
//   },
//   {
//     title: 'How to get a job',
//     description: 'I need help getting a job',
//     author: 'Livy',
//     date: new Date(),
//   },
// ]

export default function Forum() {
  const theme = useTheme()
  const [forumList, setForumList] = useState([])
  const navigate = useNavigation()

  navigate.addListener('focus', () => {
    api.get('/client/forum/top').then((res) => {
      setForumList(res.data)
    })
  })
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <SafeAreaView style={{ backgroundColor: '#fff' }} />
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
              buttonColor={theme.colors.secondary}
              onPress={() => {
                navigate.navigate('StartThread')
              }}
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
                color: theme.colors.primary,
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
              caption={item.caption}
              author={item.author}
              date={item.createdAt}
              helpful={item.helpful.length}
              id={item._id}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
