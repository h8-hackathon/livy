import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'
import { Text } from 'react-native-paper'

export default function CounselorCard({ image, name, rating, email, createdAt, id }) {
  const navigate = useNavigation()
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigate.navigate('CounselorProfile', { counselorId: id })
      }}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image || 'https://picsum.photos/101/101' }}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 1}}>

          <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>
            {name}
          </Text>
          <Text style={styles.rating} numberOfLines={1} ellipsizeMode='tail'>
            {email}
          </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name='location' size={15} color='#FFD700' />
            <Text style={styles.rating}>{rating} Joined {new Date(createdAt).toLocaleDateString(
              'id-ID',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
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
    flexDirection: 'row',
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
    paddingVertical: 20,
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    // borderWidth: 1,
    maxWidth: Dimensions.get('window').width - 200,
    // flex: 1,
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
