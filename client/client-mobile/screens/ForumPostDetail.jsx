import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { api } from '../helpers/axios'
import {
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ForumPostDetail(props) {
  const navigation = useNavigation()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [caption, setCaption] = useState('')
  const postId = props.route.params.postId

  const fetchPost = () => {
    api
      .get('/client/forum/post/' + postId)
      .then((res) => {
        console.log(res.data)
        setPost(res.data)
      })
      .catch(console.log)
  }

  const fetchComments = () => {
    api
      .get('/client/forum/comment/' + postId)
      .then((res) => {
        console.log(res.data)
        setComments(res.data)
      })
      .catch(console.log)
  }

  const submitComment = async () => {
    try {
      console.log()
      const access_token = await AsyncStorage.getItem('access_token')
      const result = await api.post(
        '/client/forum/post/' + postId,
        {
          text: caption,
        },
        {
          headers: {
            access_token,
          },
        }
      )
      console.log(result)
      fetchComments()
      setCaption('')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (postId) {
      fetchPost()
      fetchComments()
    }
  }, [postId])

  if (!post) return null

  return (
    <>
      <SafeAreaView />
      <ScrollView
        style={{
          padding: 5,
        }}
      >
        <View
          style={{
            padding: 20,
            // borderWidth: 0.5,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <View>
                <Image
                  source={{
                    uri:
                      post.post.user?.images || 'https://picsum.photos/100/100',
                  }}
                  style={{ height: 30, width: 30, borderRadius: 30 }}
                />
              </View>
              <View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {post.user.name}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 10, opacity: 0.6 }}>
                    {new Date(post.post.createdAt).toLocaleString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: '90%', paddingHorizontal: 10 }}>
              <Ionicons name='flag-outline' size={15} color='black' />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {post.post.title}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 14 }}>{post.post.caption}</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: '90%', paddingHorizontal: 10 }}>
              <Ionicons name='heart-outline' size={15} color='black' />
            </View>
            <Text>{post.post.helpful.length}</Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: 'bold', paddingHorizontal: 5 }}>
            Comments
          </Text>
          {comments.map((comment) => (
            <View
              style={{
                padding: 10,
                // borderWidth: 0.5,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <View>
                    <Image
                      source={{
                        uri:
                          comment.user.images ||
                          'https://picsum.photos/100/100',
                      }}
                      style={{ height: 30, width: 30, borderRadius: 30 }}
                    />
                  </View>
                  <View>
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {comment.user.name}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, opacity: 0.6 }}>
                        {new Date(comment.comment.createdAt).toLocaleString(
                          'id-ID',
                          {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 14 }}>{comment.comment.text}</Text>
              </View>
            </View>
          ))}
          <View
            style={{
              marginTop: 10,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <TextInput
              numberOfLines={1}
              style={{
                flex: 1,
                borderWidth: 0.5,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                fontSize: 15,
              }}
              placeholder='Write your comment here...'
              onChangeText={setCaption}
              value={caption}
              onSubmitEditing={submitComment}
            />
            <TouchableOpacity onPress={submitComment}>
              <Ionicons name='send' size={20} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
