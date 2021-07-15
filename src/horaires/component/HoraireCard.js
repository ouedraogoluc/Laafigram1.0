import React from 'react'
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Dimensions, Image, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { globalStyles } from '../style/globalStyles'


export default function HorairesCard({ horaireData, onModalOpen, moveToHorairesScreen }) {

   const { title, coverImage } = horaireData

   return (
      <TouchableOpacity
         style={styles.container}
         onPress={() => moveToHorairesScreen(horaireData)}
      >
         <TouchableWithoutFeedback>
            <Ionicons
               name='ios-ellipsis-vertical-circle'
               size={32}
               color='white'
               style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  zIndex: 1,
               }}
               onPress={() => onModalOpen(horaireData.id)}
            />
         </TouchableWithoutFeedback>

         <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <TouchableOpacity
             //  style={styles.touchableBtn}
               onPress={onUpdateHoraire}
               
            >
               <Text >Update</Text>
            </TouchableOpacity>
         </View>
      </TouchableOpacity>
   )

   return (
      <View>

      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#FFF",
      borderRadius: 5,
      padding: 8,
      flexDirection: "row",
      marginVertical: 8
   },

   card: {
      height: '100%',
      width: '100%',

   },

   cardTitle: {
      fontSize: 14,
      fontFamily: 'Lato-Regular',
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 15
   },
})
