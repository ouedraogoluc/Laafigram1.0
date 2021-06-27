import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet,FlatList, View, Text } from 'react-native';
import firebase from 'firebase'
import "firebase/firestore";
import Fire from '../post/Fire';
import { db, auth } from '../../firebase/config';

const DoctorList = () => {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
       useEffect(() => {
           const subscriber = db
             .collection('doctors')
             .onSnapshot(querySnapshot => {
               const users = [];
               querySnapshot.forEach(documentSnapshot => {
                 users.push({
                   ...documentSnapshot.data(),
                   key: documentSnapshot.id,
                 });
               });
         
             setUsers(users);
               setLoading(false);
             });
         
           // Unsubscribe from events when no longer in use
           return () => subscriber();
         }, []);
         if (loading) {
           return <ActivityIndicator />;
         }
       return (
           <FlatList
           data={users}
           renderItem={({ item }) => (
             <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Text>{item.id}</Text>
               <Text>formation: {item.formation}</Text>
               <Text>specialite: {item.specialite}</Text>
               <Text>experience :{item.experience}</Text>
               <Text>niveauEtude:{item.niveauEtude}</Text>
               <Text>department:{item.department}</Text>
             </View>
           )}
         />
       )
}

export default DoctorList

const styles = StyleSheet.create({})
