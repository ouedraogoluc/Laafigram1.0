import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native'
import firebase from 'firebase'
import "firebase/firestore";
import Fire from '../post/Fire';
import { db, auth } from '../../firebase/config';
import { Ionicons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { FloatingAction } from "react-native-floating-action";
const actions = [
    {
        text: "Post",
        icon: require("../../../assets/icon1.png"),
        name: "btn_add",
        position: 1
    },
    {
        text: "share",
        icon: require("../../../assets/icon1.png"),
        name: "btn_share",
        position: 2
    }
];
const HomeScreen2 = () => {
    return (
        <View style={styles.container}>
            <Text>ok</Text>

            <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                       if (name=='btn_add') {
                           navigation.navigate('Post')
                       }      
                    }}
                />
                
                <StatusBar style="auto" />
        </View>
    )
}

export default HomeScreen2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
      },
})
