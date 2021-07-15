import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    TouchableHighlight,
    Button ,

} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase'
import "firebase/firestore";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
import FormInput from '../inputForm/FormInput';
import * as ImagePicker  from 'expo-image-picker';
import { Platform } from 'react-native';
const ComplteProfileUser = ({route ,navigation}) => {  
    const [profile, setProfile] = useState('')
    const [image,setImage] = useState(null)
    let id = route.params?.id
    const uid = auth.currentUser.uid

    useEffect(() => {
        (
            async ()=>{
                if (Platform.OS !=='web') {
                        const {
                            status
                        }=await ImagePicker.requestMediaLibraryPermissionsAsync();
                        if (status !=="granted") {
                             alert("sorry")
                        }
                }
            }
        )();
        if (id) {
            getProfileData(id)
        }
      }, [id])
    
      function onCheck() {
        if (id) {
          onUpdate(id)
          return
        }
        onCreate()
      }
      
      function getProfileData(id) {
        db.collection('profile')
          .doc(uid)
          .collection('userProfile')
          .doc(id)
          .get()
          .then((snapshot) => {
             const data = snapshot.data()
            setJours(data.jours)
          })
      }
    const onCreate = async ()=>{
        setLoading(true)
        if( !image){
               alert("please add all the field")
               return 
        }
        try{
            db.collection('profile')
            .doc(uid)
            .collection('userProfile')
            .add({
             pic:image,
              //createdAt: firebase.firestore.FieldValue.serverTimestamp()
              createdAt: new Date().toISOString()
            }) 
            setLoading(false)
        }catch(err){
            alert("something went wrong")
        }
       

    }

    const pickImageAndUpload = async ()=>{
        let result =await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri)
        }
    };
        return (
           
                <View style={styles.container} enabled>
                <Button title="take image"  onPress={pickImageAndUpload}
               />
                   <Button title="upload" onPress={()=>{}}/>
                </View>
        )
    
   
}

export default ComplteProfileUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    row: {
        marginBottom: 20,
    },
    label: {
        fontSize: 20
    },
    textInput: {
        height: 40,
        borderWidth: 0,
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
      },
    btnContainer: {
        backgroundColor: '#1A8',
        padding: 10,
        alignItems: 'center',
    },
    txtButton: {
        fontSize: 20,
        color: "#fff"
    }
})
