import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
} from "react-native";
import Login from "./Login";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Account(props) {
  // const { user, setUser } = useUser()
  const { setUser } = useUser();
  // const navigate = useNavigation()

  // props.navigation.addListener('focus', () => {})

  // if (!user) return <Login />
  const user = {
    id: 2,
    name: "Muhammmad Jawahiruzzaman",
    email: "m.jawahiruzzaman@gmail.com",
    gender: "M",
    dob: "2003-08-20T00:00:00.000Z",
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxabNF0IIhaiqJbDc_sAXaC7B2gPU3DVjuoyUWOlvQ=s96-c",
    // "role": "counselor",
    helpful: 0,
    createdAt: "2023-03-07T11:40:38.674Z",
    // "updatedAt": "2023-03-07T13:35:37.582Z"
  };
  return (
    <>
      <SafeAreaView />
      <View style={{ padding: 10 }}>
        <Text>Account</Text>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: user.image || "https://picsum.photos/101/101" }}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
                {user.name}
              </Text>
              <Text
                style={styles.rating}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user.email}
              </Text>
           
            </View>
          </View>
        </View>
        <View style={styles.tile}>
          <View style={styles.ratingContainer}>
            <Ionicons
              style={{ padding: 10 }}
              name="location"
              size={15}
              color="#FFD700"
            />
            <Text style={{ padding: 10 }}>
              {" "}
              Joined{" "}
              {new Date(user.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>
        <View style={styles.tile}>
          <View style={styles.ratingContainer}>
            <Ionicons
              style={{ padding: 10 }}
              name="location"
              size={15}
              color="#FFD700"
            />
            <Text style={{ padding: 10 }}>
            {" "}
            Helpful {user.helpful}
            </Text>
          </View>
        </View>
        <View style={styles.tile}>
          <View style={styles.ratingContainer}>
            <Ionicons
              style={{ padding: 10 }}
              name="location"
              size={15}
              color="#FFD700"
            />
            <Text style={{ padding: 10 }}>
            {" "}
            Date of Birth 
{" "}
              {new Date(user?.dob).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>
        <View style={styles.tile}>
          <View style={styles.ratingContainer}>
            <Ionicons
              style={{ padding: 10 }}
              name="location"
              size={15}
              color="#FFD700"
            />
               <Button
                onPress={() => {
                  AsyncStorage.removeItem("access_token");
                  setUser(null);
                }}
                mode="contained"
                style={{marginVertical:15}}
              >
                Logout
              </Button>
          </View>
        </View>
        
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    paddingBottom: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    flexWrap:'wrap'
  },
  tile: {
    borderRadius: 5,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 1,
    elevation: .3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: "row",
  },
  imageContainer: {
    padding: 20,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75,
  },
  textContainer: {
    // paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    // borderWidth: 1,
    maxWidth: Dimensions.get("window").width - 200,
    // flex: 1,
  },
  rating: {
    fontSize: 14,
    color: "#aaa",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
