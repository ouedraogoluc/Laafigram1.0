import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, ActivityIndicator, View, FlatList } from 'react-native'
import NumberPlease from "react-native-number-please";
import { db, auth, storage } from '../firebase/config'
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,

} from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import {
  Container, Card, UserInfo, UserImg,
  UserInfoText,
  UserName,
  PostTime,
  PostText,
  PostImg,
  Divider,
  Interaction,
  InteractionText,
  InteractionWrapper

} from '../container/dashboad/style/HomeStyle'

/*   const initialBirthday = [
    { id: "day", value: 16 },
    { id: "month", value: 4 },
    { id: "year", value: 1970 },
  ];
     <View>
      <Text>My birthday</Text>
      <NumberPlease
        digits={date}
        values={birthday}
        onChange={(values) => setBirtday(values)}
      />
    </View> 
  const [birthday, setBirtday] = useState(initialBirthday);

  const date = [
    { id: "day", label: "", min: 0, max: 31 },
    { id: "month", label: "", min: 0, max: 12 },
    { id: "year", label: "", min: 1900, max: new Date().getFullYear()
  },
  ] */
const Schedule = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState([])

  function getEventData() {
    db.collection('events')
      .doc(auth.currentUser.uid)
      .collection('userEvents')
      .orderBy("createdAt", "desc")
      .onSnapshot((quearySnapshot) => {
        const data = []
        quearySnapshot.forEach((documentSnapshot) => {
          data.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id
          })
        })
        setEvent(data)
      })
  }


  useEffect(() => {
    getEventData()
    console.log(event);
    setLoading(false);
  }, [])

  function onDeleteEvent() {
    db.collection('events')
      .doc(auth().currentUser.uid)
      .collection('userEvents')
      .doc(selectedCardId)
      .delete()
      .catch((error) => console.log(error))
  }
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <Container>
        <FlatList
          data={event}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <Card>

              <UserInfo>
                <UserInfoText>
                <PostTime> {typeof item.createdAt === 'string' ? formatDate(item.createdAt) : 'Autre format'}</PostTime>
                  <UserName>jour:{item.jours}</UserName>
                  <UserName>jour et heur de l'evenement: { item.date.time}</UserName>
                </UserInfoText>
              </UserInfo>
              <PostText> {item.degree}</PostText>
              <PostText>{item.description}</PostText>
              <Divider />

              <InteractionWrapper>
                <Interaction active >
                  <Ionicons name="heart-outline" size={25} color="2e64e5" />
                  <TouchableRipple onPress={() => navigation.navigate('createEvent', { ...item })}>
                    <InteractionText >Modifier</InteractionText>
                  </TouchableRipple>
                </Interaction>

                <Interaction>
                  <Ionicons name="md-chatbubble-outline" size={25} />
                  <TouchableRipple  >
                    <InteractionText >supprimer</InteractionText>
                  </TouchableRipple>

                </Interaction>

              </InteractionWrapper>
            </Card>


          )}
        />
      </Container>
    </SafeAreaView>


  );


}
function formatDate(date) {
  const d = new Date(date)
  function pad(n) { return n < 10 ? '0' + n : n }
  return  pad(d.getUTCDay()) + ''
      + pad(d.getUTCMonth() + 1) + '-'
    + d.getUTCFullYear() + '-'
    + pad(d.getUTCMinutes()) + ':'
    + pad(d.getUTCSeconds()) + 'Z'
    + pad(d.getUTCHours()) + ':'
    
}

export default Schedule

const styles = StyleSheet.create({})
