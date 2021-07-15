
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SettingsScreen from '../horaires/screen/SettingsScreen'
import HoraireScreen2 from '../horaires/screen/HoraireScreen2'

const Tab = createMaterialTopTabNavigator();
const HoraireTabTopNavigation = () => {
    return (
        <Tab.Navigator>
        <Tab.Screen name="horaireScreen2" component={HoraireScreen2} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    )
}

export default HoraireTabTopNavigation

const styles = StyleSheet.create({})
