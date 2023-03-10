import { ProgressBar, Text, useTheme } from 'react-native-paper'
import { Dimensions, Image, Pressable, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import YoutubePlayer from 'react-native-youtube-iframe'
import { getYTid } from '../helpers/getYTid'

function Podcast({ item }) {
  const { title, description, url } = item

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <View
        style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}
      >
        <Image
          style={{ width: 200, height: 200, borderRadius: 100 }}
          source={{
            uri: 'https://www.iconsdb.com/icons/preview/green/audio-wave-xxl.png',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 20,
            fontSize: 20,
            maxWidth: 300,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            marginHorizontal: 10,
            marginBottom: 25,
            textAlign: 'center',
            fontSize: 12,
          }}
        >
          {description}
        </Text>
      </View>
      {/* <View style={{ flex: 1, justifyContent: "center" }}> */}
      <WebView
        scalesPageToFit={false}
        source={{
          uri: url,
          html: `
          <body style="overflow:hidden; height:10px">
          <div style="text-align:center; width: 100% ">
          <audio controls style="width:80%;"  src="${url}" allow="autoplay; " ></audio> </div>
          </body>
          `,
        }}
      />
      {/* </View> */}
      {/* <ProgressBar
        style={{ backgroundColor: "#dedede", height: 5, width: 200 }}
        visible={true}
        progress={0.7}
      />
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 8,
          paddingVertical: 5,
          borderRadius: 100,
          elevation: 3,
          marginTop: 15,
          backgroundColor: useTheme().colors.secondary,
        }}
        onPress={playSound}
      >
        <Ionicons
          name={playback?.isPlaying ? "pause" : "play"}
          size={50}
          color="white"
        />
      </Pressable> */}
    </View>
  )
}

function Article({ item }) {
  const { title, description, image, date } = item

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#fefefe' }} />
      <ScrollView style={{ flex: 1 }}>
        <View style={{}}>
          <Image
            style={{
              width: '100%',
              height: 250,
            }}
            source={{
              uri: image,
            }}
          />
        </View>
        <View
          contentContainerStyle={{ padding: 5 }}
          style={{
            top: -20,
            backgroundColor: 'white',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingTop: 30,
          }}
        >
          <View
            style={{
              margin: 15,
            }}
          >
            <Text style={{ fontWeight: 700, fontSize: 20 }}>{title}</Text>
            <Text style={{ fontSize: 12, marginTop: 5 }}>
              {new Date(date).toLocaleString('id-ID', {
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                year: 'numeric',
              })}
            </Text>
            <Text style={{ marginTop: 18, textAlign: 'justify', fontSize: 18 }}>
              {description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

function Videos({ item }) {
  const { title, caption, url, createdAt } = item
  console.log(item, '<<<>>>')
  return (
    <>
      <SafeAreaView />
      <ScrollView>
        <YoutubePlayer
          height={(Dimensions.get('screen').width * 9) / 16}
          videoId={getYTid(url)}
        />
        <View
          style={{
            margin: 15,
          }}
        >
          <Text style={{ fontWeight: 700, fontSize: 20 }}>{title}</Text>
          <Text style={{ fontSize: 12, marginTop: 5 }}>
            {new Date(createdAt).toLocaleString('id-ID', {
              month: 'long',
              day: 'numeric',
              weekday: 'long',
              year: 'numeric',
            })}
          </Text>
          <Text style={{ marginTop: 18, textAlign: 'justify', fontSize: 18 }}>
            {caption}
          </Text>
        </View>
      </ScrollView>
    </>
  )
}

export default function PostDetail(props) {
  console.log(props.route.params)
  const item = props.route.params
  if (item.type === 'video') return <Videos item={item} />
  if (item.type === 'podcast') return <Podcast item={item} />
  return <Article item={item} />
}
