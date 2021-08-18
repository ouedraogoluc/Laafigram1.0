import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text,StyleSheet, FlatList, Image,TouchableOpacity,TextInput , View, SafeAreaView } from 'react-native';
import firebase from 'firebase'
import "firebase/firestore";
import Fire from '../post/Fire';
import { db, auth } from '../../firebase/config';
import { Ionicons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,

} from 'react-native-paper';
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

} from '../../container/dashboad/style/HomeStyle'

const DoctorList = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  useEffect(() => {
    const subscriber = db
      .collection('users')
      .where('profile', '==', 'doctor')
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



    <SafeAreaView style={{ flex: 1 }}>
    
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Enter text here..." />
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="ios-search" size={25} color="#000" />
          </TouchableOpacity>
        </View>

      <Container>

        <FlatList
          data={users}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Card>
              <UserInfo>
                <Image source={require('../../../images/doc2.jpg')} style={styles.avatar} />
                <UserInfoText>
                  <UserName>{item.name}</UserName>
                  <PostTime>{item.email}</PostTime>
                </UserInfoText>
              </UserInfo>
              <PostText>{item.profile}</PostText>
              <PostText>{item.niveauEtude}</PostText>
              <PostText>{item.formation}</PostText>
              <Divider />
              <InteractionWrapper>
                <Interaction active >
                  <Ionicons name="heart-outline" size={25} color="2e64e5" />
                  <TouchableRipple onPress={() => navigation.navigate('RendezVous', { userkey: item.key })}>
                    <InteractionText >Rendez Vous</InteractionText>
                  </TouchableRipple>
                </Interaction>
                <Interaction>
                  <Ionicons name="md-chatbubble-outline" size={25} />
                  <TouchableRipple onPress={() => navigation.navigate('Rdv', { userkey: item.key })}>
                    <InteractionText >Detail</InteractionText>
                  </TouchableRipple>
                </Interaction>
                <Interaction>
                  <Ionicons name="md-chatbox-outline" size={25} />
                  <TouchableRipple onPress={() => navigation.navigate('ChatHome')}>
                    <InteractionText>Message</InteractionText>
                  </TouchableRipple>

                </Interaction>
              </InteractionWrapper>
            </Card>

          )}
        />
      </Container>
    </SafeAreaView>
  )
}

export default DoctorList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4"
  },
  header: {
    paddingTop: 24,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500"
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 60,
    borderRadius: 5,
    marginVertical: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    marginLeft: 15,
  },
  input: {
    width: '100%',
    height: 45,
    padding: 10,
    color: '#000',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#00716F',
    marginRight: 5,
    fontSize: 18,
    backgroundColor: "#FFF",
  },
  inputContainer: {
    backgroundColor: "#FFF",
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  searchBtn: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
    
  },
});
