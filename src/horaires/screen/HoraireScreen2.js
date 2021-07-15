import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, Button } from 'react-native'
import { Ionicons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { FloatingAction } from "react-native-floating-action";
import { globalStyles } from '../style/globalStyles';
import ModalView from '../component/ModalView'
import { Avatar, Icon } from 'react-native-elements'
import { db, auth } from '../../firebase/config'
import firebase from 'firebase';
const actions = [
   {
      text: "Horaires",
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
const HoraireScreen2 = ({ navigation }) => {
   const [horaires, setHoraires] = useState([])
   const [modalOpen, setModalOpen] = useState(false)
   const [selectedCardId, setSelectedCardId] = useState([])

   function getHoraireData() {
      db.collection('usersHoraires')
         .doc(auth.currentUser.uid)
         .collection('horaires')
         .onSnapshot((quearySnapshot) => {
            const data = []
            quearySnapshot.forEach((documentSnapshot) => {
               data.push({
                  ...documentSnapshot.data(),
                  id: documentSnapshot.id
               })
            })
            setHoraires(data)
         })
   }

   useEffect(() => {
      getHoraireData()
      console.log(horaires);
   }, [])

   function moveToHorairesScreen(horaireData) {
      navigation.navigate('blog', {
         horaireData
      })
   }
   function onModalOpen(cardId) {
      setModalOpen(true)
      setSelectedCardId(cardId)
   }
   function onCloseModal() {
      setModalOpen(false)
      setSelectedCardId(null)
   }
   function onUpdateHoraire() {
      navigation.navigate('Horaires', { id: selectedCardId })
      setSelectedCardId(null)
      setModalOpen(false)
   }
   function onDeleteHoraire() {
      db.collection('usersHoraires')
         .doc(auth().currentUser.uid)
         .collection('horaires')
         .doc(selectedCardId)
         .delete()
         .catch((error) => console.log(error))
   }

   return (
      <View style={{ flex: 1 }}>
         <FlatList
            data={horaires}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <View>
                  <Text>{item.title}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 25 }}>
                     <TouchableHighlight onPress={() => navigation.navigate('Horaires', { ...item })}>
                        <View style={{ marginRight: 15 }}>
                           <Icon size={30} color="blue" name="edit" />
                        </View>
                     </TouchableHighlight>
                     <TouchableHighlight onPress={onDeleteHoraire} >
                        <View>
                           <Icon
                              name='delete'
                              type='material'
                              color='#e32f45'
                           />
                        </View>
                     </TouchableHighlight>
                  </View>
               </View>
            )}
         />
         <FloatingAction
            actions={actions}
            onPressItem={name => {
               if (name == 'btn_add') {
                  navigation.navigate('Horaires')
               }
            }}
         />

         <StatusBar style="auto" />
      </View>
   )
}

export default HoraireScreen2

const styles = StyleSheet.create({})
