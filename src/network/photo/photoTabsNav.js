import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Photo from './Photo';
import Album from './Album';

const Tab = createMaterialTopTabNavigator();
const photoTabsNav = () => {
    return (
        <Tab.Navigator>
        <Tab.Screen name="photo" component={Photo} />
        <Tab.Screen name="album" component={Album} />
      </Tab.Navigator>
    )
}

export default photoTabsNav

const styles = StyleSheet.create({})
