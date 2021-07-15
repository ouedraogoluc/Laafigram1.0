import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-big-calendar'

const events = [
  {
    title: 'Meeting',
    start: new Date(2021, 1, 7, 8, 0),
    end: new Date(2021, 1, 8, 8, 30),
  },
  {
    title: 'Coffee break',
    start: new Date(2021, 1, 7, 9, 45),
    end: new Date(2021, 1,  8, 10, 30),
  },
]

const eventTabs = () => {
  return <Calendar events={events} height={600} />
}

export default eventTabs

const styles = StyleSheet.create({})
