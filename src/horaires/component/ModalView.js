import React from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'

import { globalStyles } from '../style/globalStyles'


export default function ModalView({ onPressHandlers }) {

   const {
      onUpdateHoraire,
      onDeleteHoraire,
      onCloseModal
   } = onPressHandlers

   return (
      <View >
         <View >
            <TouchableOpacity
             //  style={styles.touchableBtn}
               onPress={onUpdateHoraire}
            >
               <Text >Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              // style={styles.touchableBtn}
               onPress={onDeleteHoraire}
            >
               <Text >Delete</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
               //style={styles.touchableBtn}
               onPress={() => onCloseModal()}
            >
               <Text >Cancel</Text>
            </TouchableOpacity>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }, 
   touchableBtn: {
      ...globalStyles.primaryTouchableBtn,
      width: '80%',
      alignSelf: 'center',
      marginVertical: 5
   },
   modalViewContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      width: 500,
      padding: 10,
      width: '85%',
      shadowOffset: {
         width: 10,
         height: 10
      },
      shadowColor: 'black',
      elevation: 10
      
   }
})