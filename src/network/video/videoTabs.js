import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import videoScreen from './videoScreen';
import VideoAlbum from './VideoAlbum';

const Tab = createMaterialTopTabNavigator();
const videoTabs = () => {
    return (
        <Tab.Navigator>
        <Tab.Screen name="video" component={videoScreen} />
        <Tab.Screen name="VideoAlbum" component={VideoAlbum} />
      </Tab.Navigator>
    )
}

export default videoTabs

const styles = StyleSheet.create({})
