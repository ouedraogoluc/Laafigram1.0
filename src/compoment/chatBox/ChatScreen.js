/* import React,{useLayoutEffect } from 'react'
import {  SafeAreaView,View } from 'react-native';
import { StyleSheet,Text, ScrollView,TouchableOpacity,FlatList } from 'react-native';
import {Avatar} from 'react-native-elements';
import CustomListItem from './CustomListItem'
import {auth, db } from '../../firebase/config'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
  } from './MessageStyles';
  
  const Messages = [
    {
      id: '1',
      userName: 'ouedraogo luc',
      userImg: require("../../../images/doc6.jpg"),
      messageTime: '4 mins ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '2',
      userName: 'Dr Bencé',
      userImg:  require("../../../images/doc4.jpg"),
      messageTime: '2 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '3',
      userName: 'Dr Augusto',
      userImg:  require("../../../images/doc2.jpg"),
      messageTime: '1 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '4',
      userName: 'Terrim',
      userImg: require("../../../images/doc1.jpg"),
      messageTime: '1 day ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require("../../../images/doc3.jpg"),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
  ];
  
const ChatScreen = ({navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Laafigram",
            headerStyle:{backgroundColor:'#00716F'},
            headerTitleStyle:{color:"#fff"},
            hearderTintColor:"#fff",
            headerRight:()=>(
                <View style={{
                  flexDirection:'row',
                  justifyContent: 'space-between',
                  width:80,
                  marginRight:20
                }}>
                    <TouchableOpacity  activeOpacity={0.5}>
                    <AntDesign name='camerao' size={24} color='#fff'/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress ={()=>navigation.navigate("AddChat")} activeOpacity={0.5}>
                    <SimpleLineIcons name='pencil' size={24} color='#fff'/>
                    </TouchableOpacity>
             </View>
            ),
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>search here</Text>
        </View>
            <Container>
              <FlatList 
                data={Messages}
                keyExtractor={item=>item.id}
                renderItem={({item}) => (
                  <Card onPress={() => navigation.navigate('AddChat', {userName: item.userName})}>
                    <UserInfo>
                      <UserImgWrapper>
                        <UserImg source={item.userImg} />
                      </UserImgWrapper>
                      <TextSection>
                        <UserInfoText>
                          <UserName>{item.userName}</UserName>
                          <PostTime>{item.messageTime}</PostTime>
                        </UserInfoText>
                        <MessageText>{item.messageText}</MessageText>
                      </TextSection>
                    </UserInfo>
                  </Card>
                )}
              />
            </Container>
            </View>
    );
}

export default ChatScreen

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
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }
});
 */

import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, View } from 'react-native';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import { StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from './CustomListItem'
import { auth, db } from '../../firebase/config'
const ChatScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  
  useEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .onSnapshot(snapshot => {

        setChats(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
    return unsubscribe
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Laafigram",
      headerStyle: { backgroundColor: '#00716F' },
      headerTitleStyle: { color: "#fff" },
      hearderTintColor: "#fff",
      headerRight: () => (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 80,
          marginRight: 20
        }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color='#fff' />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
            <SimpleLineIcons name='pencil' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const enterChat=(id,ChatName)=>{
    navigation.navigate('ChatHome',{
      id,
      ChatName
    })
  }
  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Enter text here..." />
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="ios-search" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView>
           {chats.map(({id,data:{ChatName}})=>(
                <CustomListItem  key={id} 
                id={id} 
                ChatName={ChatName} 
                enterChat={enterChat}
                />
           ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container:{
     height:'100%'  
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









