import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native'
import firebase from 'firebase'
import "firebase/firestore";
import Fire from '../post/Fire';
import { db, auth } from '../../firebase/config';
import { Ionicons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { FloatingAction } from "react-native-floating-action";
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
import moment from 'moment';
import ProgressiveImage from './ProgressiveImage';
const actions = [
  {
    text: "Post",
    icon: require("../../../assets/icon1.png"),
    name: "btn_add",
    position: 1
  },
  {
    text: "share",
    icon: require("../../../assets/icon1.png"),
    name: "btn_share",
    position: 2
  }
];
const HomeScreen2 = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [posts, setPosts] = useState([]); // Initial empty array of users
  const [uid, setUid] = useState("")
  useEffect(() => {
    const subscriber = db
      .collection('posts')
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        const posts = [];
        querySnapshot.forEach(documentSnapshot => {
          posts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setPosts(posts);
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
      <Container>

        <FlatList

          data={posts}
          keyExtractor={(item) => item.key}

          renderItem={({ item }) => {
            //console.log("************************************",item);
            return (
             <Card>
                <UserInfo>
                  <Image source={require('../../../images/doc2.jpg')} style={styles.avatar} />
                  <UserInfoText>
                    <UserName>{item.email}</UserName>
                    <PostTime>{typeof item.createdAt === 'string' ? formatDate(item.createdAt) : 'Autre format'}</PostTime>
                  </UserInfoText>
                </UserInfo>
                <PostText>{item.text}</PostText>
                
                {item.image != null ? (
                  <ProgressiveImage
                    defaultImageSource={require('../../../assets/default-img.jpg')}
                    source={{ uri: item.image }}
                    style={{ width: '100%', height: 250 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Divider />
                )}
                   <InteractionWrapper>
        <Interaction active>
        <Ionicons name="heart-outline" size={25} color="2e64e5" />
          <InteractionText active>234 likes</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>12 comments</InteractionText>
        </Interaction>
        <Interaction>
        <Ionicons name="md-share-social-outline" size={24} color="#73788B"  />
          <InteractionText>12 </InteractionText>
        </Interaction>

      </InteractionWrapper>

              </Card>



              /* 
                            <View style={styles.feedItem}>
                              
                            <Image source={require('../../../images/doc2.jpg')} style={styles.avatar} />
                            <View style={{ flex: 1 }}>
                              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <View>
                                  <Text style={styles.name}>{item.email}</Text>
                                  <Text style={styles.name}>{item.displayName}</Text>
                                   <Text style={styles.timestamp}> il ya {typeof item.createdAt === 'string' ? formatDate(item.createdAt): 'Autre format'}</Text> 
                                </View>
                                <Feather name="more-horizontal" size={24} color="#73788B" />
                              </View>
                              <Text style={styles.post}>{item.text}</Text>
                              <Image source={{
                                uri:item.image
                              }} style={styles.postImage} resizeMode="cover" />
                                 <View style={{ flexDirection: "row" }}>
                                <Ionicons name="heart-outline" size={25} color="2e64e5" style={{ marginRight: 16 }} />
                                <Ionicons name="md-chatbubble-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
                                <Ionicons name="md-share-social-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
                              </View>
                            </View>
                           
                            </View> */

            )
          }}
        />
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            if (name == 'btn_add') {
              navigation.navigate('Post')
            }
          }}
        />

        <StatusBar style="auto" />
      </Container>
    </SafeAreaView>
  )

}
function formatDate(date) {
  const d = new Date(date)
  function pad(n) { return n < 10 ? '0' + n : n }
  return pad(d.getUTCMonth() + 1) + '-'
    + d.getUTCFullYear() + '-'
    + pad(d.getUTCMinutes()) + ':'
    + pad(d.getUTCSeconds()) + 'Z'
    + pad(d.getUTCHours()) + ':'
    + pad(d.getUTCDate()) + 'T'
}
export default HomeScreen2

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
    height: 200,
    borderRadius: 5,
    marginVertical: 16
  }
})
