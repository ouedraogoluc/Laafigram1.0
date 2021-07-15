import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, Picker, TextInput, Button, Platform } from "react-native";
import FormInput from '../compoment/inputForm/FormInput';
import FormButton from '../compoment/button/FormButton';
import NumberPlease from "react-native-number-please";
import Ionicons from "@expo/vector-icons";
import { db, auth, storage } from '../firebase/config'
import firebase from 'firebase'
import DateTimePicker from '@react-native-community/datetimepicker';
const createEvent = ({ navigation, route }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [jours, setJours] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [degree, setDegree] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  /*  const initialBirthday = [
       { id: "day", value: 16 },
       { id: "month", value: 4 },
       { id: "year", value: 1970 },
     ];
     const [birthday, setBirtday] = useState(initialBirthday);
     console.log('************************',birthday);
     const date = [
       { id: "day", label: "", min: 0, max: 31 },
       { id: "month", label: "", min: 0, max: 12 },
       { id: "year", label: "", min: 1900, max: new Date().getFullYear()
     },
     ]  */
  let id = route.params?.id
  const uid = auth.currentUser.uid

  useEffect(() => {
    if (id) {
      getEventData(id)
    }
  }, [id])

  function onCheck() {
    if (id) {
      onUpdate(id)
      return
    }
    onCreate()
  }

  function getEventData(id) {
    db.collection('events')
      .doc(uid)
      .collection('userEvents')
      .doc(id)
      .get()
      .then((snapshot) => {
        const data = snapshot.data()
        setJours(data.jours)
        // setBirtday(data.birthday)
        setHeureDebut(data.heureDebut)
        setHeureFin(data.heureFin)
        setTypeEvent(data.typeEvent)
        setDegree(data.degree)
        setDescription(data.description)
        setDate(data.date)
        setMode(data.mode)
      })
  }

  async function onCreate() {
    if (!jours && !heureDebut && !heureFin && !typeEvent && !degree && !description && !date && !mode) {
      return false
    }
    navigation.navigate('schedule')
     console.log('*********************************dat',date);
    try {
      db.collection('events')
        .doc(uid)
        .collection('userEvents')
        .add({
          jours,
          // birthday: birthday[0].value + '/' + birthday[1].value + '/' + birthday[2].value,
          typeEvent,
          degree,
          description,
          date,
         
          //createdAt: firebase.firestore.FieldValue.serverTimestamp()
          createdAt: new Date().toISOString()
        })
    } catch (error) {
      console.log(error)
    }
  }

  async function onUpdate(id) {
    navigation.navigate('schedule')
    try {

      db.collection('events')
        .doc(uid)
        .collection('userEvents')
        .doc(id)
        .update({
          jours,
          date,
          typeEvent,
          degree,
          description,
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View behavior="position" style={{ height: "100%", flex: 1 }}>
      <ScrollView>
        <View style={styles.picker}>
          <Picker
            jours={jours}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => setJours(itemValue)}
          >
            <Picker.Item label="jours" />
            <Picker.Item label="Lundi" value="lundi" />
            <Picker.Item label="Mardi" value="mardi" />
            <Picker.Item label="Mercredi" value="mercredi" />
            <Picker.Item label="Jeudi" value="jeudi" />
            <Picker.Item label="Vendredi" value="vendredi" />
            <Picker.Item label="Samedi" value="samedi" />
            <Picker.Item label="Dimenche" value="dimenche" />
          </Picker>
        </View>
     
        <View style={styles.picker}>
          <Picker
            degree={degree}
            style={{ height: 40, width: 150 }}
            onValueChange={(itemValue) => setDegree(itemValue)}
          >
            <Picker.Item label="Degree" />
            <Picker.Item label="Important" value="Important" />
            <Picker.Item label="Urgent" value="Urgent" />
            <Picker.Item label="Important et Urgent" value="Important et Urgent" />
          </Picker>
        </View>
        {/*  <View style={styles.inputContainer}>
            <TextInput placeholder="date" style={styles.input} 
              value={birthday}
            onChangeText={(text)=>setBirtday(text)}
            />
          </View> */}
        {/*      <View>
      <Text>date</Text>
      <NumberPlease
        digits={date}
        values={birthday}
        onChange={(values) => setBirtday(values)}
      />
    </View>   */}
       
        
        <View style={styles.inputContainer}>
          <TextInput placeholder="type d'evenement " style={styles.input}
            value={typeEvent}
            onChangeText={(text) => setTypeEvent(text)}
            multiline={true}
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="decrire"
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <View>
          <Text onPress={showDatepicker}
            style={styles.txtbtn}
            >choisir date!</Text>
        </View>
        <View>
          <Text onPress={showTimepicker} 
          style={styles.txtbtn}>choisir heur!</Text>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <FormButton
          buttonTitle="Valider"
          onPress={onCheck}
        />
      </ScrollView>
    </View>
  );
}

export default createEvent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4"
  },
  inputContainer: { 
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderColor: "#00716F",
   },
  input: {

    borderBottomWidth: 1,

    borderBottomWidth: 0.5,
    flex: 1,
    fontSize: 18,
  },
  inputIcon: { marginTop: 15, position: 'absolute' },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  picker: {

    paddingTop: 20,
    alignItems: "center"
  },
  txtbtn:{
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
    color:"black"
  }
})
