import React from 'react'
import firebase from '../../firebase/config'

const LoginRequest = async (email,password) => {
    try {
        return await firebase.auth().signInWithEmailAndPassword(email,password)
    } catch (error) {
        
    }
}

export default LoginRequest
