import { useNavigation, useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react/cjs/react.production.min";
import { api } from "../helpers/axios";

export default function CounselorPorfile(props) {
  const { counselorId } = props.route.params;
  const [counselor, setCounselor] = useState(null);
  const navigation = useNavigation();
  console.log(props);
  const fetchCounselor = async () => {
    try {
      const response = await api.get(`/client/counselors/${counselorId}`);
      setCounselor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createSchedule = async () => {
    try {
      const response = await api.post("/client/schedule", {
        CounselorId: +counselorId,
        time: new Date(),
      });
      navigation.navigate("Schedule");

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (counselorId) {
  //     fetchCounselor()
  //   }

  //   return () => {
  //     setCounselor(null)
  //   }
  // }, [counselorId])

  // if (!counselor) {
  //   return null
  // }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: useTheme().colors.primary }}>
        <SafeAreaView />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={{ uri: "https://picsum.photos/800/450" }}
            style={{
              width: 120,
              height: 120,
              marginTop: 20,
              marginBottom: 10,
              borderRadius: 400 / 2,
            }}
          />
          {/* <Text style={{ fontSize: 50 }}>{counselorId}</Text> */}

          <Text
            style={{
              fontSize: 20,
              color: "white",
              textAlign: "center",
              maxWidth: 250,
            }}
          >
            sulkhan galang rasyidi
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            flex: 2,
            marginHorizontal: 10,
            padding: 10,
            borderTopLeftRadius: 44 / 2,
            borderTopRightRadius: 44 / 2,
          }}
        >
          <ScrollView
            style={{
              flex: 1,
            }}
          >
            <Button onPress={createSchedule} mode="contained">
              Create Schedule
            </Button>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
