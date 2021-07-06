import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RegisterHome = ({navigation}) => {
  return (
    <View style={{marginTop:80}}>
      <Text style={{marginTop:80}} onPress={()=>navigation.navigate("patient")}  >patient</Text>
      <Text style={{marginTop:80}} onPress={()=>navigation.navigate("doctor")}>doctor</Text>
      <Text style={{marginTop:80}} onPress={()=>navigation.navigate("medical")}>medical</Text>

      <Text></Text>
      <Text></Text>
    </View>
  )
}

export default RegisterHome

const styles = StyleSheet.create({})
