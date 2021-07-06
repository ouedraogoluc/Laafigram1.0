import React, { useState ,useEffect} from 'react'
import { Text, View, Image, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import {db,auth} from '../../firebase/config';
import firebase from 'firebase'
import "firebase/firestore";
import Fire from '../post/Fire';
const SignIn = ({navigation})=> {
  
    const [email ,setEmail]= useState("");
    const [password ,setPassword]= useState("");
    //recuperation des informations de l'utilisateur
    useEffect(() => {
     const unsubscribe=auth.onAuthStateChanged((currentUser)=>{
         console.log(currentUser);
              if (currentUser) {
                  navigation.navigate("Home")
              }
          });
    return unsubscribe;
    }, [])
    const signIn =()=>{
      auth
      .signInWithEmailAndPassword(email,password)
      .catch((error)=>alert(error));
    }
        return (
            <View style={{ backgroundColor: "#FFF", height: "100%" }}>
                <Image source={require('../../../images/image.jpg')}
                    style={{ width: "100%", height: "43%" }}
                />
                <Text
                    style={{
                        fontSize: 30,
                        fontFamily: "SemiBold",
                        alignSelf: "center",
                    }}
                >Welcome to laafigram </Text>
                <Text
                    style={{
                        fontFamily: "SemiBold",
                        marginHorizontal: 55,
                        textAlign: 'center',
                        marginTop: 5,
                        opacity: 0.4
                    }}
                >
                    En vous inscrivant sur laafigram vous acceptez les conditions et la politique d'utilisation
                </Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 55,
                    borderWidth: 2,
                    marginTop: 50,
                    paddingHorizontal: 10,
                    borderColor: "#00716F",
                    borderRadius: 23,
                    paddingVertical: 2
                }}>
                    <Icon name="mail" color="#00716F" size={24} />
                    <TextInput
                        style={{ paddingHorizontal: 10 }}
                        value={email}
                       onChangeText={(text)=>setEmail(text)}
                    />
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 55,
                    borderWidth: 2,
                    marginTop: 15,
                    paddingHorizontal: 10,
                    borderColor: "#00716F",
                    borderRadius: 23,
                    paddingVertical: 2
                }}>
                    <Icon name="clef" color="#00716F" size={24} />
                    <TextInput
                        secureTextEntry={true}
                        style={{ paddingHorizontal: 10 }}
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                        onSubmitEditing={signIn}
                    />
                </View>
                <View style={{
                    marginHorizontal: 55,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 30,
                    backgroundColor: "#00716F",
                    paddingVertical: 10,
                    borderRadius: 23
                }}>
                    <Text style={{
                        color: "white",
                        fontFamily: "SemiBold"
                    }}
                    onPress={signIn} x
                    >Sign In</Text>
                </View>
                <Text
                    onPress={()=>navigation.navigate('RegisterHome')}
                    style={{
                        alignSelf: "center",
                        color: "#00716F",
                        fontFamily: "SemiBold",
                        paddingVertical: 30
                    }}> New to Laafigram? Sign Up</Text>
            </View>
        )

}

export default SignIn;
