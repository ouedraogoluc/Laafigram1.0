/* import React, {useState, useEffect, useCallback,useLayoutEffect} from 'react';
import {View, ScrollView, TouchableOpacity , Text, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AntDesign,Ionicons, SimpleLineIcons} from '@expo/vector-icons'

const AddChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
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
                <AntDesign name='phone' size={24} color='#fff'/>
                </TouchableOpacity>

                <TouchableOpacity  activeOpacity={0.5}>
                <Ionicons name='ios-videocam' size={24} color='#fff'/>
                </TouchableOpacity>
         </View>
        ),
    });
}, [navigation]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>

          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */

import React, {useState, useEffect, useCallback,useLayoutEffect} from 'react';
import {View, ScrollView, TouchableOpacity , Text, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AntDesign,Ionicons, SimpleLineIcons} from '@expo/vector-icons'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Input,Button } from 'react-native-elements'
import { db, auth } from '../../firebase/config';
const AddChatScreen = ({navigation }) => {
  
  const [input,setInput]=useState("");
    
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
                <AntDesign name='phone' size={24} color='#fff'/>
                </TouchableOpacity>

                <TouchableOpacity  activeOpacity={0.5}>
                <Ionicons name='ios-videocam' size={24} color='#fff'/>
                </TouchableOpacity>
         </View>
        ),
    });
}, [navigation]);
const createChat =async ()=>{
  await db.collection("chats")
  .add({
      ChatName:input,
  })
  .then(()=>{
      navigation.goBack();
  })
  .catch((error)=>alert(error));
}
  return (
    <View style={styles.container}>
    <Input
        placeholder="enter a new chat"
        value={input}
        onChangeText={(text)=>setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
           <Icon name="wechat" type="antdesign" size={24} color="black"/>
       }
    />
    <Button  onPress={createChat} title="create new chat"/>
   </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({})
