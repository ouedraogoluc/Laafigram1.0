import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../container/dashboad/HomeScreen';
import DoctorList from '../container/doctor/DoctorList';
import MedicalList from '../container/medical/MedicalList';
import PatientList from '../container/patient/PatientList';
import PostScreen from '../container/dashboad/PostScreen';
import ChatScreen from '../compoment/chatBox/ChatScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import More from '../compoment/more/More';
import Profile from '../compoment/profile/Profile';
/* import AddPostScreen from '../screens/AddPostScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EditProfileScreen from '../screens/EditProfileScreen'; */

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack =()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}
       options={({navigation}) => ({
        title: '',
        headerStyle: {
          backgroundColor: '#f9fafd',
          shadowColor: '#f9fafd',
          elevation: 0,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <FontAwesome.Button 
              name="long-arrow-left"
              size={25}
              backgroundColor="#f9fafd"
              color="#333"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        ),
      })}
      />
    </Stack.Navigator>
  )
}
export default AppStack