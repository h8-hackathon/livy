import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

export default function CounselorCard({ image, name, rating, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name='star' size={15} color='#FFD700' />
            <Text style={styles.rating}>{rating} / 5</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
    borderTopRightRadius: 150,
    borderTopLeftRadius: 150,
  },
  textContainer: {
    padding: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: '#aaa',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
})
