import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,

} from 'react-native-paper';
import { Ionicons, AntDesign, Fontisto } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db, auth } from '../../../firebase/config';
import firebase from 'firebase'
const Apropos = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState('')
    useEffect(() => {
        const users = [];
        db.collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(docSnap => {
                setProfile(docSnap.data())

            })

        setUsers(users);
        setLoading(false);
    }, []);
    if (loading) {
        return <ActivityIndicator />;
    }
    if (profile.profile == "doctor") {
        return (
            <View>
                <Text>ok doctor</Text>
            </View>
        )
    } else if (profile.profile== "patient") {
        return (
            <View>
                <Text>ok patient</Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text>ok medical</Text>
            </View>
        )
    }

}

export default Apropos

const styles = StyleSheet.create({})
