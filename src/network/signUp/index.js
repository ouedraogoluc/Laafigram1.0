import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from '../../firebase/config'

const signUpRequest = async (email,password) => {
    try {
        return await firebase.auth().createUserWithEmailAndPassword(email,password)
    } catch (error) {
        
    }
}

export default signUpRequest

const styles = StyleSheet.create({})
