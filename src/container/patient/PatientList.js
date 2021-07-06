import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet,FlatList,Image, View, SafeAreaView  } from 'react-native';
import firebase from 'firebase'
import "firebase/firestore";
import Fire from '../post/Fire';
import { db, auth } from '../../firebase/config';
import { Ionicons, Feather , SimpleLineIcons } from '@expo/vector-icons';
import {
  Avatar,
  Title,
  Caption,

  TouchableRipple,

} from 'react-native-paper';
import {Container,Card,UserInfo,UserImg,
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

const PatientList = ({navigation}) => {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
       useEffect(() => {
           const subscriber = db
             .collection('users')
             .where('profile','==','patient')
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
        <SafeAreaView style={{flex: 1}}>
        <Container>
           <FlatList
           data={users}
           renderItem={({ item }) => (
            
                 <Card>
             <UserInfo>
             <Image source={require('../../../images/doc2.jpg')}style={styles.avatar} />
              <UserInfoText>
              <UserName>{item.name}</UserName>
              <PostTime>{item.email}</PostTime>
              </UserInfoText>
           </UserInfo>
           <PostText>{item.profile}</PostText>
           <PostText>{item.address}</PostText>
           <PostText>{item.number}</PostText>
           <PostText>{item.groupeSanguin}</PostText>
           <PostText>{item.dateNaiss}</PostText>
           <PostText>{item.poids}Kg</PostText>
                 <Divider/> 
           <InteractionWrapper>
              <Interaction active >
                <Ionicons name="heart-outline" size={25} color="2e64e5" />
                <InteractionText active> s'abonnée</InteractionText>
              </Interaction>
              <Interaction>
              </Interaction>
              <Interaction>
                <Ionicons name="md-chatbox-outline" size={25} />
                <TouchableRipple onPress={() => navigation.navigate('Chat')}>
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

export default PatientList

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
  }
});
