import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Dimensions, ScrollView, View, ImageBackground } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import CounselorCard from '../components/CounselorCard'
import { api } from '../helpers/axios'
import { useUser } from '../hooks/useUser'

const ArticleCard = ({
  title,
  date,
  image,
}) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        width: (Dimensions.get('screen').width / 3.2) * 2,
        borderColor: '#408775',
        // borderWidth: .5,
        gap: 10,
      }}
    >
      <Text
        style={{ fontWeight: 'bold', fontSize: 20, flexWrap: 'nowrap' }}
        ellipsizeMode='tail'
        numberOfLines={2}
      >
        {title}
      </Text>
      <Text
        style={{ fontWeight: 'normal', fontSize: 10, flex: 1, opacity: 0.7 }}
        ellipsizeMode='clip'
      >
        {new Date(date).toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <View>
        <Image
          source={{ uri: image }}
          style={{
            width: '100%',
            aspectRatio: 16 / 9,
            borderRadius: 10,
            marginVertical: 10,
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 10,
            color: useTheme().colors.primary,
          }}
        >
          Continue Reading
        </Text>
        <Ionicons
          name='ios-arrow-forward'
          size={15}
          color={useTheme().colors.primary}
        />
      </View>
    </View>
  )
}

const VideoCard = () => {
  return (
    <View
      style={{
        overflow: 'hidden',
        paddingLeft: 15,
      }}
    >
      <ImageBackground
        source={{ uri: 'https://picsum.photos/800/450' }}
        resizeMode='cover'
        style={{
          backgroundColor: '#000',
          borderRadius: 15,
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginRight: 10,
          width: (Dimensions.get('screen').width / 3.2) * 2,
          aspectRatio: 16 / 9,
          borderColor: '#408775',
          borderWidth: 1,
        }}
        imageStyle={{ borderRadius: 15, opacity: 0.5 }}
      >
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              flexWrap: 'nowrap',
              color: '#fff',
            }}
            ellipsizeMode='tail'
          >
            Ini Judul Video Tentang Sesuatu
          </Text>
        </View>
      </ImageBackground>
    </View>
  )
}
const PodcastCard = ({
  title,
  date,
  description
}) => {
  return (
    <View
      style={{
        overflow: 'hidden',
        padding: 15,
        width: '100%',
        height: 110,
      }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 15,
          // borderWidth: 0.5,
          // alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <View
          style={{
            // justifyContent: 'center',
            padding: 5,
            alignItems: 'center',
            // borderWidth: 0.5,
          }}
        >
          <Image
            source={require('../assets/Logo.png')}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View style={{ gap: 5 }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: '#000',
                maxWidth: '90%',
              }}
              ellipsizeMode='tail'
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={{
                fontWeight: 'normal',
                fontSize: 10,
                color: '#000',
                maxWidth: '90%',
              }}
              ellipsizeMode='tail'
              numberOfLines={2}
            >
              {description}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                backgroundColor: useTheme().colors.secondary,
                width: 25,
                height: 25,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name='ios-play' size={10} color='#fff' />
            </View>
            <Text style={{ fontSize: 10 }}>
              {new Date(date).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default function Home() {
  const [home, setHome] = useState(null)
  const [counselors, setcounselors] = useState([])
  const { user } = useUser()

  const fetchData = async () => {
    const res = await api.get('/client/home')
    setHome(res.data)
    console.log(res.data)
  }

  const fetchCounselors = async () => {
    const res = await api.get('/client/counselors')
    console.log(res.data)
    setcounselors(res.data)
  }
  useEffect(() => {
    fetchData()
    fetchCounselors()
  }, [])
  return (
    <>
      <SafeAreaView />
      <ScrollView style={{ flex: 1 }}>
        {/* <View
        style={{
          backgroundColor: '#408775',
          height: Dimensions.get('screen').height / 2,
          borderBottomEndRadius: 60,
          borderBottomStartRadius: 60,
          opacity: 0.2,
        }}
      ></View> */}

        <View
          style={{
            // transform: [{ translateY: -Dimensions.get('screen').height / 2.3 }],
            paddingHorizontal: 5,
            paddingTop: 20,
            gap: 10,
            // backgroundColor: '#e0e0e0',
          }}
        >
          <View
            style={{
              gap: 10,
              backgroundColor: useTheme().colors.primary,
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                opacity: 0.7,
                fontSize: 10,
                color: '#fff',
              }}
            >
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 15,
                color: '#fff',
              }}
            >
              Selamat Pagi{user ? user.name : ''}!
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: '#fff',
                borderRadius: 15,
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginBottom: 25,
              }}
            >
              <Ionicons name='ios-trophy-outline' size={15} color='black' />
              <Text style={{ fontWeight: 'normal' }}>
                Focus on managing small things first
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>Article</Text>
            <Text style={{ fontWeight: 'normal' }}>Terbaru</Text>
            <Ionicons
              name='ios-chevron-forward'
              size={15}
              color={useTheme().colors.primary}
            />
          </View>
          <ScrollView horizontal>
            <View style={{ flexDirection: 'row' }}>
              {home?.articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  image={article.url}
                  date={article.createdAt}
                />
              ))}
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>Counselor</Text>
            <Text style={{ fontWeight: 'normal' }}>Terfavorit</Text>
            <Ionicons
              name='ios-chevron-forward'
              size={15}
              color={useTheme().colors.primary}
            />
          </View>
          <ScrollView horizontal>
            {counselors.map((counselor, i) => <CounselorCard {...counselor.User} key={i} />)}
            <CounselorCard
              name='Husin'
              image={'https://picsum.photos/100/100'}
              rating={5}
            />
            <CounselorCard
              name='Husin'
              image={'https://picsum.photos/100/100'}
              rating={5}
            />
            <CounselorCard
              name='Husin'
              image={'https://picsum.photos/100/100'}
              rating={5}
            />
            <CounselorCard
              name='Husin'
              image={'https://picsum.photos/100/100'}
              rating={5}
            />
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>Video</Text>
            <Text style={{ fontWeight: 'normal' }}>Terbaru</Text>
            <Ionicons
              name='ios-chevron-forward'
              size={15}
              color={useTheme().colors.primary}
            />
          </View>
          <ScrollView horizontal>
            <View style={{ flexDirection: 'row' }}>
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
            </View>
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>Podcast</Text>
            <Text style={{ fontWeight: 'normal' }}>Terbaru</Text>
            <Ionicons
              name='ios-chevron-forward'
              size={15}
              color={useTheme().colors.primary}
            />
          </View>
          <ScrollView>
            <View style={{ flexDirection: 'column' }}>

              {home?.podcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  title={podcast.title}
                  url={podcast.url}
                  date={podcast.createdAt}
                  description={podcast.caption}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  )
}
