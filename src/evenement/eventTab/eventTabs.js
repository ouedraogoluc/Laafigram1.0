import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Schedule from '../Schedule'
import calandar from '../calandar'
import createEvent from '../createEvent'

const Tab = createMaterialTopTabNavigator();
const HoraireTabTopNavigation = () => {
    return (
        <Tab.Navigator>
        <Tab.Screen name="schedule" component={Schedule} />
        <Tab.Screen name="calandar" component={calandar} />
        <Tab.Screen name="createEvent" component={createEvent} />
      </Tab.Navigator>
    )
}

export default HoraireTabTopNavigation

const styles = StyleSheet.create({})
