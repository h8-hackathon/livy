import { ProgressBar, Text, useTheme } from "react-native-paper";
import { Image, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { pauseAudio, playAudio, resumeAudio } from "../helpers/audioController";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/core";

function Podcast({ item }) {
  const isFocused = useIsFocused();
  const [sound, setSound] = useState();
  const [playback, setPlayback] = useState();
  const { title, description, url } = item;
  const playSound = async () => {
    if (!playback) {
      const playObj = new Audio.Sound();
      const status = await playAudio(playObj, url);
      setSound(playObj);
      setPlayback(status);
      return;
    }

    if (playback?.isLoaded && playback?.isPlaying) {
      const status = await pauseAudio(sound);
      return setPlayback(status);
    }

    if (playback?.isLoaded && !playback?.isPlaying) {
      const status = await resumeAudio(sound);
      return setPlayback(status);
    }
  };

  useEffect(() => {
    if (!isFocused && sound) {
      pauseAudio(sound);
      sound.unloadAsync();
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SafeAreaView />
      <Image
        style={{ width: 200, height: 200, borderRadius: 100 }}
        source={{
          uri: "https://www.iconsdb.com/icons/preview/green/audio-wave-xxl.png",
        }}
      />
      <Text
        style={{
          textAlign: "center",
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
          textAlign: "center",
          fontSize: 12,
        }}
      >
        {description}
      </Text>
      <ProgressBar
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
      </Pressable>
    </View>
  );
}

function Article({ item }) {
  const { title, description, url, date } = item;

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <View style={{ position: "relative" }}>
        <Image
          style={{
            width: "100%",
            height: 320,
          }}
          source={{
            uri: url,
          }}
        />
      </View>
      <ScrollView
        style={{
          top: -20,
          backgroundColor: "white",
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
            {new Date(date).toLocaleString("id-ID", {
              month: "long",
              day: "numeric",
              weekday: "long",
              year: "numeric",
            })}
          </Text>
          <Text style={{ marginTop: 15, textAlign: "justify" }}>
            {description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default function PostDetail(props) {
  const item = props.route.params;
  if (item.type === "podcast") return <Podcast item={item} />;
  return <Article item={item} />;
}
