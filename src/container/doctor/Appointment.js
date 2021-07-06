import React,{useState } from 'react'
import { StyleSheet, Text,TextInput ,Button , View } from 'react-native'
import { db, auth } from '../../firebase/config';
import * as firebase from 'firebase';
import 'firebase/firestore';
const Appointment = (props) => {
    const [caption, setCaption] = useState("")
    const savePostData =async ()=>{
        await db.collection("test")
           .doc(firebase.auth().currentUser.uid)
            //.collection("userPosts")
            .add({
                caption:caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                props.navigation.navigate("Home");

            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <View style={{ flex: 1 }}>

            <TextInput
                placeholder="Write a Caption . . ."
                value={caption}
                onChangeText={(text) => setCaption(text)}
                onSubmitEditing={savePostData}
            />

            <Button title="Save" onPress={savePostData} />
        </View>
    )
}

export default Appointment

const styles = StyleSheet.create({})
