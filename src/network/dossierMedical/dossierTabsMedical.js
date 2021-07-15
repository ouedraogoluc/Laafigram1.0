import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyAppointment from './MyAppointment';
import Consultation from './Consultation';
import dossierMedical from './dossierMedical';

const Tab = createMaterialTopTabNavigator();
const dossierTabsMedical = () => {
    return (
        <Tab.Navigator>
        <Tab.Screen name="MyAppointment" component={MyAppointment} />
        <Tab.Screen name="consultation" component={Consultation} />
        <Tab.Screen name="dossierMedical" component={dossierMedical} />
      </Tab.Navigator>
    )
}

export default dossierTabsMedical

const styles = StyleSheet.create({})
