import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import More from '../compoment/more/More'
import Profile from '../compoment/profile/Profile'
import PostScreen from '../container/post/PostScreen'
import HoraideDoctor from '../container/doctor/HoraideDoctor'
import ListHoraire from '../container/doctor/ListHoraire'

import Rdv from '../container/Rdv/Detail'
import RendezVous from '../container/Rdv/RendezVous'
import Appointment from '../container/doctor/Appointment'

import Scheldul from '../evenement/Schedule'
/* import NavBarView from '../evenement/NavBarView'
import CardContainer from '../evenement/CardContainer'
import Card from '../evenement/Card'
import Helpers from '../evenement/Helpers'
import AgendaView from '../evenement/agenda/index'
 */
import TeleHomeScreen from '../Teleconference/TeleHomeScreen'
import ComplteProfileUser from '../compoment/profile/ComplteProfileUser'
 import ChatScreen from '../compoment/chatBox/ChatScreen'
import ChatHome from '../compoment/chatBox/ChatHome' 
/* import ChatHome from '../container/chat/ChatHome'
import ChatScreen from '../container/chat/ChatScreen' */
import AddChatScreen from '../compoment/chatBox/AddChatScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomTabButton from '../navigation/CustomTabButton'
import createMaterialTopTabNavigator from '../navigation/HoraireTabTopNavigation'
/* import AddPost from '../container/post/AddPost'
import PostForm from '../container/post/FoodFormScreen '
import PostFormScreen from '../container/post/FoodForm'
 */
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
            height: 70,
            elevation:0.0,
            borderRadius: 3,
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
        <Stack.Screen name="CompleteProfile" component={ComplteProfileUser} />

        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="ChatHome" component={ChatHome} />
        <Stack.Screen name="Chats" component={ChatScreen} />

        <Stack.Screen name="Rdv" component={Rdv} />
        <Stack.Screen name="RendezVous" component={RendezVous} />
        <Stack.Screen name="Appointment" component={Appointment} />
        
        <Stack.Screen name="scheldul" component={Scheldul} />
       {/*  <Stack.Screen name="event" component={EventsView} />
        <Stack.Screen name="card" component={Card} />
        <Stack.Screen name="cardContainer" component={CardContainer} />
        <Stack.Screen name="Helpers" component={Helpers} />
        <Stack.Screen name="AgendaView" component={AgendaView} /> 
                    */}

        <Stack.Screen name="Post" component={PostScreen} 
           options={{ header: () => null }} />{/* 
          <Stack.Screen name="AddPost" component={AddPost} 
        options={{ header: () => null }} />
          <Stack.Screen name="PostForm" component={PostForm} />
          <Stack.Screen name="PostFormScreen" component={PostFormScreen} />
            */}
          
          <Stack.Screen name="Teleconference" component={TeleHomeScreen} />
          

          <Stack.Screen name="Horaires" component={HoraideDoctor} />
          <Stack.Screen name="ho" component={createMaterialTopTabNavigator} />

          <Stack.Screen name="ListHoraire" component={ListHoraire} />

          
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default RoutesTabsBottom

const styles = StyleSheet.create({})
