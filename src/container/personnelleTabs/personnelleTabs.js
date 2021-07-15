import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DoctorList from '../doctor/DoctorList';
import PatientList from '../patient/PatientList';
import MedicalList from '../medical/MedicalList';
import New from './New';

const Tab = createMaterialTopTabNavigator();

const personnelleTabs = () => {
  
    return (
        <Tab.Navigator>
        <Tab.Screen name="Medecins" component={DoctorList} />
        <Tab.Screen name="Patients" component={PatientList} />
        <Tab.Screen name="Medical" component={MedicalList} />
       <Tab.Screen name="new" component={New} /> 
      </Tab.Navigator>
    )
}

export default personnelleTabs

const styles = StyleSheet.create({})