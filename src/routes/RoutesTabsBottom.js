import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import More from '../compoment/more/More'
import Profile from '../compoment/profile/Profile'
import PostScreen from '../container/post/PostScreen'
import createHoraideDoctor from '../horaires/screen/createHoraideDoctor'
// import AppEvent  from '../event2.0/AppEvent'

import Rdv from '../container/Rdv/Detail'
import RendezVous from '../container/Rdv/RendezVous'
import Appointment from '../container/doctor/Appointment'

import eventTabs from '../evenement/eventTab/eventTabs'

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
import ModalView from '../horaires/component/ModalView'
import HoraireCard from '../horaires/component/HoraireCard'
import Blog from '../horaires/screen/Blog'
import Apropos from '../compoment/profile/apropos/Apropos'
import photoTabsNav from '../network/photo/photoTabsNav'
import videoTabs from '../network/video/videoTabs'
import dossierTabsMedical from '../network/dossierMedical/dossierTabsMedical'
import formRdv from '../network/dossierMedical/formRdv'
import eventModal from '../modal/eventModal'

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
            height: 80,
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
        <Stack.Screen name="apropos" component={Apropos} />
        <Stack.Screen name="modal" component={eventModal} />
        <Stack.Screen name="CompleteProfile" component={ComplteProfileUser} />

        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="ChatHome" component={ChatHome} />
        <Stack.Screen name="Chats" component={ChatScreen} />

        <Stack.Screen name="Rdv" component={Rdv} />
        <Stack.Screen name="RendezVous" component={RendezVous} />
        <Stack.Screen name="Appointment" component={Appointment} />
        
        
       {/*  <Stack.Screen name="event" component={EventsView} />
        <Stack.Screen name="card" component={Card} />
        <Stack.Screen name="cardContainer" component={CardContainer} />
        <Stack.Screen name="Helpers" component={Helpers} />
      
                    */}

        <Stack.Screen name="Post" component={PostScreen} 
           options={{ header: () => null }} />{/* 
          <Stack.Screen name="AddPost" component={AddPost} 
        options={{ header: () => null }} />
          <Stack.Screen name="PostForm" component={PostForm} />
          <Stack.Screen name="PostFormScreen" component={PostFormScreen} />
            */}
          
          <Stack.Screen name="Teleconference" component={TeleHomeScreen} />
          

          <Stack.Screen name="Horaires" component={createHoraideDoctor} />
          <Stack.Screen name="ModalView" component={ModalView} />
          <Stack.Screen name="HoraireCard" component={HoraireCard} />
          <Stack.Screen name="blog" component={Blog} />
          <Stack.Screen name="ho" component={createMaterialTopTabNavigator} />

          <Stack.Screen name="videoScreen" component={videoTabs} />
          <Stack.Screen name="eventTabs" component={eventTabs} />
          <Stack.Screen name="photoScreen" component={photoTabsNav} />
          <Stack.Screen name="dossierMedicalScreen" component={dossierTabsMedical} /> 
          <Stack.Screen name="formulaire" component={formRdv} /> 
          

          
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default RoutesTabsBottom

const styles = StyleSheet.create({})
