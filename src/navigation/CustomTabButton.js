import React, { useLayoutEffect } from 'react'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, Fontisto } from '@expo/vector-icons';

import PostScreen from '../container/post/PostScreen'
import HomeScreen from '../container/dashboad/HomeScreen'
import DoctorList from '../container/doctor/DoctorList'
import MedicalList from '../container/medical/MedicalList'
import PatientList from '../container/patient/PatientList'
import SearchScreen from '../container/search/SearchScreen'

import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabsNavigation = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "LaafiGram",
            headerStyle: { backgroundColor: "#00716F" ,
            height: 110,
            elevation:0.0,
            borderRadius: 5,
            
         },
            headerTitleStyle: { color: "#fff" },
            hearderTintColor: "#fff",

            headerLeft: () => {

            },
            
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 150,
                    marginRight: 20
                }}>
                    <TouchableOpacity  onPress={() => navigation.navigate("notification")} activeOpacity={0.5}>
                        <Ionicons name='ios-notifications-circle-outline' size={24} color= "#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => navigation.navigate("Post")} activeOpacity={0.5}>
                        <Ionicons name='ios-add' size={24} color= "#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")} activeOpacity={0.5}>
                        <Ionicons name='ios-person' size={24} color= "#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Chat")} activeOpacity={0.5}>
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
            <Tab.Screen name="home" component={HomeScreen}
                options={{
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
            <Tab.Screen name="doctor" component={DoctorList}
                options={{
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
            <Tab.Screen name="patient" component={PatientList}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: 10
                            }}
                        >
                            <Image
                                source={require('../../images/patient1.png')}
                                resizeMode="contain"
                                style={{
                                    width: 40,
                                    height: 40,
                                    //  tintColor: focused ? '#e32f45' : '#748c94',
                                }}
                            />
                        </View>
                    ),
                }} />
            <Tab.Screen name="medical" component={MedicalList}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: 10
                            }}
                        >
                            <Image
                                source={require('../../images/homemedical2.jpg')}
                                resizeMode="contain"
                                style={{
                                    width: 40,
                                    height: 40,
                                    //  tintColor: focused ? '#e32f45' : '#748c94',
                                }}
                            />
                        </View>
                    ),
                }} />
                        <Tab.Screen name="Search" component={SearchScreen}
                        
                options={{
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
        elevation: 5
    }

})