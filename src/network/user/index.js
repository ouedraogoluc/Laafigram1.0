import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from '../../firebase/config'

export const AddUser = async (name,email,uid,profileImg) => {
    try {
        return await firebase
        .database()
         .ref('users/'+uid)
         .set({
             name:name,
             email:email,
             uid:uid,
             profileImg:profileImg
             
         })
    } catch (error) {
        
    }
}

