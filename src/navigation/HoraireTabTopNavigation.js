
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SettingsScreen from '../container/Rdv/SettingsScreen'
import HomeScreen2 from '../container/Rdv/HomeScreen2'

const Tab = createMaterialTopTabNavigator();
const HoraireTabTopNavigation = () => {
    return (
        <Tab.Navigator>
        <Tab.Screen name="Home1" component={HomeScreen2} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    )
}

export default HoraireTabTopNavigation

const styles = StyleSheet.create({})
