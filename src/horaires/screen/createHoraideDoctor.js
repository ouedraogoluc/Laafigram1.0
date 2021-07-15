import React, { useState, useEffect } from 'react'
import { View, TextInput, ImageBackground,Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { Ionicons, AntDesign, Fontisto } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
   Avatar,
   Title,
   Caption,
  
   TouchableRipple,

} from 'react-native-paper';
import {db,auth,storage} from '../../firebase/config'

//let oldCoverImageURL

export default function createHoraideDoctor({ navigation, route }) {

   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [coverImg, setCoverImg] = useState(null)
   let id = route.params?.id
   const uid = auth.currentUser.uid

   useEffect(() => {
      if(id) {
         getHoraireData(id)
      }
   }, [id])
/* 
   function onUploadImage() {
      launchImageLibrary({
         mediaType: 'photo',
      }, (data) => setCoverImg(data.assets[0].uri))
   } */

   function onCheck() {
      if(id) {
         onUpdate(id)
         return
      }
      onCreate()
   }

   function getHoraireData(id) {
      db.collection('usersHoraires')
      .doc(uid)
      .collection('horaires')
      .doc(id)
      .get()
      .then((snapshot) => {
         const data = snapshot.data()
         setTitle(data.title)
         setContent(data.content)
       /*   setCoverImg(data.coverImage)
         oldCoverImageURL = data.coverImage */
      })
   }

  /*  async function upladCoverImg(uid) {
      const splitPath = coverImg.split('/')
      const imageName = splitPath[splitPath.length-1]
      const reference = storage.ref(`/${uid}/images/${imageName}`)
      const data =  await reference.putFile(coverImg)
      return await storage.ref(data.metadata.fullPath).getDownloadURL()
   } */

   async function onCreate() {
      if(!title && !content) {
         return false
      }
      navigation.navigate('ho')

      try {
         //const downloadURL = await upladCoverImg(uid)

         db.collection('usersHoraires')
         .doc(uid)
         .collection('horaires')
         .add({
            title,
            content,
          //  coverImage: downloadURL,
           createdAt: firestore.FieldValue.serverTimestamp()
         })
      } catch(error) {
         console.log(error)
      }
   }

   async function onUpdate(id) {
      navigation.navigate('ho')
      try {
       /*   let downloadURL = oldCoverImageURL

         if(oldCoverImageURL !== coverImg) {
            downloadURL = await upladCoverImg(uid)
         } */

         db.collection('usersHraires')
         .doc(uid)
         .collection('horaires')
         .doc(id)
         .update({
            title,
            content,
            //coverImage: downloadURL,
           // lastUpdate: firestore.FieldValue.serverTimestamp()
         })
      } catch(error) {
         console.log(error)
      }
   } 

   return (
      <ImageBackground
      source={require("../../../assets/back2.png")}
      style={{ width: "100%", height: "100%" }}
      >
        <View style={{ paddingHorizontal: 40, marginTop: 25 }}>

          <Text
            style={{
              fontSize: 40,
              color: "#522289",
              fontFamily: "RobotoBold",
            }}
          >
            Hello
          </Text>
          <Text
            style={{
              fontSize: 15,
              paddingVertical: 10,
              paddingRight: 80,
              lineHeight: 22,
              fontFamily: "RobotoRegular",
              color: "#a2a2db",
            }}
          >
            Lorem ipsum dolor sit amet, consectetuer adipscing elit.
          </Text>
          <View style={styles.subView}>
          <ScrollView>
          <View style={styles.infoBoxWrapper}>
                    <View style={styles.infoBox}>
                    <Text
                  style={{
                  fontSize: 20,
                  color: "#522289",
                  fontFamily: "RobotoBold",
                  }}
               >
            Definir les jours
          </Text>
                    </View>
                </View>
          </ScrollView>
          </View>
          </View>
      </ImageBackground>
     /* <ScrollView 
         style={globalStyles.primaryContainer}
         keyboardShouldPersistTaps={'always'}
      >
         <Text style={{ ...globalStyles.headingText, margin:10 }}>Create A Blog</Text>
         <View
            style={styles.inputContainer}
         >
            <Text style={styles.label}>Title</Text>
            <TextInput 
               style={styles.input}
               multiline={true}
               numberOfLines={2}
               value={title}
               onChangeText={(text) => setTitle(text)}
            />
         </View>

         <View
            style={styles.inputContainer}
         >
            <Text style={styles.label}>Content</Text>
            <TextInput 
               style={styles.input}
               multiline={true}
               numberOfLines={10}
               value={content}
               onChangeText={(text) => setContent(text)}
               underlineColorAndroid='transparent'
            />
         </View>
         <FontAwesome 
            name='check-circle'
            color='purple'
            size={44}
            style={styles.uploadBtn}
            onPress={onCheck}
         />

      </ScrollView> */



   )
}

const styles = StyleSheet.create({
   input: {
      borderWidth: 1,
      borderColor: 'gray',
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 2,
      padding: 10,
      textAlignVertical: 'top',
      fontSize: 16
      
   },
   label: {
      fontSize: 18,
      margin: 10,
      fontFamily: 'Nunito-Regular',

   },
  subView: {
    backgroundColor: 'white',
    height: 330,
    marginTop: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
   image: {
      width: 50,
      height: 50,
   },
   uploadBtn: {
      position: 'absolute',
      top: 10,
      right: 10,
      shadowOffset: {
         width: 1,
         height: 2
      },
      shadowOpacity: 0.5,
      elevation: 10,
   },
   infoBoxWrapper: {
      borderBottomColor: '#00716F',
      borderBottomWidth: 1,
      borderTopColor: '#00716F',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
  },
  infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
  },
})