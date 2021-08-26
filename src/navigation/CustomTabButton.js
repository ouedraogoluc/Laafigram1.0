import React, { useLayoutEffect } from 'react'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, Fontisto } from '@expo/vector-icons';

import eventTabs from '../evenement/eventTab/eventTabs'
import HomeScreen2 from '../container/dashboad/HomeScreen2'
import DoctorList from '../container/doctor/DoctorList'
import MedicalList from '../container/medical/MedicalList'
import PatientList from '../container/patient/PatientList'
import SearchScreen from '../container/search/SearchScreen'

import { createStackNavigator } from '@react-navigation/stack';
import personnelleTabs from '../container/personnelleTabs/personnelleTabs';
import Profile from '../compoment/profile/Profile';
import Search from '../container/search/SearchScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabsNavigation = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "LaafiGram",
            headerStyle: { backgroundColor: "#00716F" ,
            height: 80,
            elevation:0.0,
            borderRadius: 5,  
         },
            headerTitleStyle: { color: "#fff" ,
           
        },
            hearderTintColor: "#fff",
            headerLeft: () => {
            },
            
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 100,
                    marginRight: 20
                }}>
                   <TouchableOpacity  onPress={() => navigation.navigate("notification")} activeOpacity={0.5}>
                        <Ionicons name='ios-notifications-circle-outline' size={24} color= "#fff"/>
                    </TouchableOpacity> 
                   {/*  <TouchableOpacity  onPress={() => navigation.navigate("Post")} activeOpacity={0.5}>
                        <Ionicons name='ios-add' size={24} color= "#fff"/>
                    </TouchableOpacity> */}
                   {/*  <TouchableOpacity onPress={() => navigation.navigate("Profile")} activeOpacity={0.5}>
                        <Ionicons name='ios-person' size={24} color= "#fff"/>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => navigation.navigate("Chats")} activeOpacity={0.5}>
                        <Ionicons name='ios-chatbubble-ellipses-outline' size={24} color= "#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("More")}>
                        <Ionicons name='ios-menu' size={24} color= "#fff" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])
    return (
        <Tab.Navigator>
            <Tab.Screen name="home" component={HomeScreen2}
                options={{
                    header: () => null,
                    tabBarIcon: ({ focused }) => (
                        
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: 10
                            }}
                        >
                            <Ionicons name='ios-home' size={24} color='black'
                                style={{
                                    width: 40,
                                    height: 40,
                                }} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen name="Personnelle" component={personnelleTabs}
                options={{
                    header: () => null,
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}
                        >
                            <Fontisto name="doctor" size={24} color="black"
                                style={{ width: 40, height: 40 }} />
                        </View>
                    ),
                }}
            />
            
              <Tab.Screen name="agenda" component={eventTabs} 
                        options={{
                            header: () => null,
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}
                                >
                                    <AntDesign name="calendar" size={24} color="black"
                                        style={{ width: 40, height: 40 }} />
                                </View>
                            ),
                        }}
                    />
              <Tab.Screen name="search" component={Search}
                        
                        options={{
                            header: () => null,
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}
                                >
                                    <Ionicons name="ios-search" size={24} color="black"
                                        style={{ width: 40, height: 40 }} />
                                </View>
                            ),
                        }}
                    />
            
            <Tab.Screen name="Profile" component={Profile}
                        
                        options={{
                            header: () => null,
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}
                                >
                                    <Ionicons name="ios-person" size={24} color="black"
                                        style={{ width: 40, height: 40 }} />
                                </View>
                            ),
                        }}
                    />
            

        </Tab.Navigator>

    );
}

export default TabsNavigation


const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#fff',
        shadowOffset: {
            width: 0.30,
            height: 3.5
        },
        shadowOpacity: 0.30,
        shadowRadius: 3.5,
        elevation: 5,
        
    }

})
