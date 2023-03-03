import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Image, ScrollView } from 'react-native'
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper'
import think from '../assets/pages/Thinking.png'
const SearchIcon = () => <TextInput.Icon name='search' />

export default function Forum() {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={{ paddingVertical: 10, paddingBottom: 24 }}>
        <View
          style={{
            backgroundColor: '#fefefe',
            paddingVertical: 12,
            paddingHorizontal: 15,
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: '#eee',
            borderWidth: 2,
          }}
        >
          <Text style={{ color: '#555', fontSize: 12 }}>
            Search Forum Post...
          </Text>
          <Ionicons name='search' />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={think} style={{ height: 200, aspectRatio: 0.62 }} />
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', gap: 10, padding: 10 }}
          >
            <Text style={{ textAlign: 'center' }}>
              Punya hal yang ingin disampaikan? Jangan ragu untuk mulai cerita
              di forum ini.
            </Text>
            <Button
              mode='contained'
              icon='book'
              textColor='#444'
              buttonColor={useTheme().colors.secondary}
            >
              Start a Thread
            </Button>
          </View>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', gap: 25 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: useTheme().colors.primary,
              }}
            >
              Top Forum
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Post Terbaru
            </Text>
          </View>
        </View>
        <Divider />
        <View style={{ paddingBottom: 120, gap: 12 }}>
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderRadius: 5,
              aspectRatio: 16 / 9,
              padding: 10,
              paddingBottom: 90,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Text>
              <Text style={{ fontSize: 10 }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
                nihil pariatur, porro vero necessitatibus iure voluptas quis
                voluptates commodi at eius debitis placeat sunt molestiae
                dolorum magnam minus officiis odit.
              </Text>
            </View>
            <View>
              <Text>Husin</Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderRadius: 5,
              aspectRatio: 16 / 9,
              padding: 10,
              paddingBottom: 90,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Text>
              <Text style={{ fontSize: 10 }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
                nihil pariatur, porro vero necessitatibus iure voluptas quis
                voluptates commodi at eius debitis placeat sunt molestiae
                dolorum magnam minus officiis odit.
              </Text>
            </View>
            <View>
              <Text>Husin</Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderRadius: 5,
              aspectRatio: 16 / 9,
              padding: 10,
              paddingBottom: 90,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Text>
              <Text style={{ fontSize: 10 }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
                nihil pariatur, porro vero necessitatibus iure voluptas quis
                voluptates commodi at eius debitis placeat sunt molestiae
                dolorum magnam minus officiis odit.
              </Text>
            </View>
            <View>
              <Text>Husin</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
