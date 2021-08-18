import React, { useState ,useEffect} from 'react'
import { StyleSheet, Text,Button, View ,TextInput,ScrollView} from 'react-native'
import "firebase/firestore";
import { db, auth } from '../../firebase/config';

const formRdv = ({navigation,route}) => {
    const [loading , setLoading ] = useState('');
    const [jours , setJours] = useState('');
    const [date , setDate] = useState('');
    const [heure , setHeure ] = useState('');
    const [patientName , PatientName ] = useState('');
    const [typeDeConsultation , setTypeDeConsultation ] = useState('');
    const [modif , setModif ] = useState('');
    let id = route.params?.id
    const uid = auth.currentUser.uid
   
    useEffect(() => {
      if (id) {
        getRdvData(id)
      }
    }, [id])
  
  //recuperer la liste des rdv
    function onCheck() {
      if (id) {
        onUpdate(id)
        return
      }
      onCreate()
    }   
    function getRdvData(id) {
      db.collection('rdv')
        .doc(uid)
        .collection('userRdv')
        .doc(id)   
        .get()
        .then((snapshot) => {
          const data = snapshot.data()
          setJours(data.patientName)
          setJours(data.jours)
          setJours(data.date)
          setHeure(data.heure)
          setModif(data.modif)
          setTypeDeConsultation(data.typeDeConsultation)
        })
    }
    //creer un rdv
    async function onCreate() {
      if (!jours && !heure && !modif && !typeDeConsultation ) {
        return false
      }
      navigation.navigate('MyAppointment')
      // console.log('*********************************dat',date);
      try {
        db.collection('rdv')
          .doc(uid)
          .collection('userRdv')
          .add({
            patientName,
            jours,
            date,
            heure,
            modif,
            typeDeConsultation,
            createdAt: new Date().toISOString()
          })
      } catch (error) {
        console.log(error)
      }
    }
    //recuperer le medecin
    async function onUpdate(id) {
      try {
        db.collection('rdv')
          .update({
            name,
          })
      } catch (error) {
        console.log(error)
      }
    }
    if(loading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
        <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Patient Name'}
               value={patientName}
              onChangeText={(text) => PatientName(text)} 
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'date'}
               value={date}
              onChangeText={(text) => setDate(text)} 
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'jours'}
               value={jours}
              onChangeText={(text) => setJours(text)} 
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'heure'}
               value={heure}
              onChangeText={(text) => setHeure(text)} 
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Presentielle ou en ligne'}
             value={typeDeConsultation}
              onChangeText={(text) => setTypeDeConsultation(text)} 
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'modif de consultation'}
              value={modif}
              onChangeText={(text) => setModif(text)} 
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Valider'
            onPress={onCheck} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    )
}

export default formRdv
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
  