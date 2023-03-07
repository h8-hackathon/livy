import React from "react";
import { View, Image, Dimensions, FlatList, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, useTheme } from "react-native-paper";

const ScheduleCard = () => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        padding: 15,
        backgroundColor: "white",
        borderRadius: 20,
        flexDirection: "row",
        height: 130,
        gap: 10,
        marginVertical: 5,
      }}
    >
      <Image
        source={{ uri: "https://picsum.photos/800/450" }}
        style={{
          flex: 2,
          borderRadius: 10,
        }}
      />
      <View style={{ flex: 5, justifyContent: "space-around" }}>
        <View>
          <Text style={{ fontWeight: "800", fontSize: 12.5 }}>
            Rabu 7 Agustus 2022 || Pukul 19.00 WIB
          </Text>
          <Text style={{ fontSize: 11.5, color:'gray' }}>Nama Konselor</Text>
          <Text style={{ fontSize: 11, color:'red' }}>Menunggu pembayaran</Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Pressable
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 16,
              borderRadius: 4,
              elevation: 3,
              backgroundColor: useTheme().colors.secondary,
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                fontSize: 10,
                lineHeight: 21,
                color: "white",
              }}
            >
              Beri Penilaian
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Schedule() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: useTheme().colors.primary,
        padding: 10,
      }}
    >
      <SafeAreaView />
      <FlatList
        style={{ flex: 1 }}
        data={Array(4)}
        renderItem={({ item }) => <ScheduleCard />}
      />
    </View>
  );
}
