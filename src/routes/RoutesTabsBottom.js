import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import More from '../compoment/more/More'
import Profile from '../compoment/profile/Profile'
import PostScreen from '../container/post/PostScreen'
import ComplteProfileUser from '../compoment/profile/ComplteProfileUser'
import ChatScreen from '../compoment/chatBox/ChatScreen'
import AddChatScreen from '../compoment/chatBox/AddChatScreen'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomTabButton from '../navigation/CustomTabButton'

const Stack = createStackNavigator();


const RoutesTabsBottom =  ({navigation}) => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={CustomTabButton} />
        <Stack.Screen name="More" component={More}
         options={({ navigation }) => ({
          title: 'Laafigram',
          headerStyle: {
            backgroundColor: '#00716F',
            height: 110,
            elevation:0.0,
            borderRadius: 5,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <FontAwesome.Button
                name="long-arrow-left"
                size={25}
                backgroundColor="#00716F"
                color="#fff"
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          ),
        })}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="CompleteProfile" component={ComplteProfileUser} />
        <Stack.Screen name="Post" component={PostScreen} 
        options={{ header: () => null }}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default RoutesTabsBottom

const styles = StyleSheet.create({})
