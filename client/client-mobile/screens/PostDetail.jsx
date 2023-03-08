import {
  Button,
  MD3Colors,
  ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import { pauseAudio, playAudio, resumeAudio } from "../helpers/audioController";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";

export default function PostDetail(props) {
  const isFocused = useIsFocused();
  const { title, date, description, url } = props.route.params;
  const [sound, setSound] = useState();
  const [playback, setPlayback] = useState();
  const [current, setCurrent] = useState(0);

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
