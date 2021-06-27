import React,{useLayoutEffect } from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, Alert} from 'react-native'
import { Ionicons, AntDesign,SimpleLineIcons } from '@expo/vector-icons';

const ChatScreen = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"LaafiGram",
            headerStyle:{backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            hearderTintColor:"black",
            headerLeft:()=>{
                   
            },
            headerRight:()=>(
              <View style={{
                flexDirection:'row',
                justifyContent: 'space-between',
                width:100,
                marginRight:10
    
              }}>
                  <TouchableOpacity  activeOpacity={0.5}>
                  <Ionicons name='ios-call' size={24} color='black'/>
                  </TouchableOpacity>
                  <TouchableOpacity  activeOpacity={0.5}>
                  <Ionicons name='ios-videocam' size={24} color='black'/>
                  </TouchableOpacity>
                  <TouchableOpacity  activeOpacity={0.5}  
                   onPress={()=>Alert.alert('Logout','Are you sure to log out',[
                    {
                        text:'yes',
                        onPress:()=>alert('logged out')
                    },
                    {
                      text:'no'  
                    }
                ],{
                    cancelable:false
                })}>
                  <Ionicons name='ios-log-out' size={24} color='black'
                   
                  />
                  </TouchableOpacity>
           </View>
          ),
        });
    }, [navigation])
    return (
        <View>
            <Text>AddChat qscfev</Text>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})
