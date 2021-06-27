import React, { useContext, useState } from 'react';
import { Text, StyleSheet,View, Image, ScrollView, TextInput,CheckBox } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { windowHeight, windowWidth } from '../../utility/dimension/Dimension';
import firebase from 'firebase'
import "firebase/firestore";
const Signup = ({ navigation }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [profile,setProfile] = useState('')

    const onSignUp = (props) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email,
                        profile
                    })
                console.log(result)
            }).then(() => {
                props.navigation.navigate("Demo");
                
            })
            .catch((error) => {
                console.log(error)
            })
    };
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logo.png')}
                style={{ width: "100%", height: "30%" }}
            />
            <Text
                style={{
                    fontSize: 30,
                    fontFamily: "SemiBold",
                    alignSelf: "center",
                }}
            >Welcome to laafigram</Text>
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
            <ScrollView>

                <View style={styles.txtHeader}>
                    <TextInput
                        placeholder="ful name "
                        placeholderTextColor="#00716F"
                        style={{ paddingHorizontal: 10 }}
                        value={name}
                        onChangeText={(text)=>setName(text)}
                    />
                </View>

               
                <View style={styles.txtHeader}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#00716F"
                        style={{ paddingHorizontal: 10 }}
                        value={email}
                        onChangeText={(text)=>setEmail(text)}
                    />
                </View>
              
                <RNPickerSelect
                    onValueChange={(value) => setProfile(value)}
                    items={[
                        { label: 'patient', value: 'patient' },
                        { label: 'doctor', value: 'doctor' },
                        { label: 'medical', value: 'medical' },
                    ]}
                />
                <View style={styles.txtHeader}>
                    <TextInput
                        secureTextEntry
                        placeholder=" Password"
                        placeholderTextColor="#00716F"
                        style={{ paddingHorizontal: 10 }}
                        value={password}
                       onChangeText={(text)=>setPassword(text)}

                    />
                </View>

                <View style={styles.sign}>
                    <Text style={{
                        color: "white",
                        fontFamily: "SemiBold"
                    }}
                        onPress={onSignUp}
                    >Sign Up</Text>
                </View>
            </ScrollView>
        </View>
    )

}

export default Signup

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        height: "100%"
    },
    txtHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 55,
        borderWidth: 2,
        marginTop: 15,
        paddingHorizontal: 10,
        borderColor: "#00716F",
        borderRadius: 23,
        paddingVertical: 2
    },
    sign: {
        marginHorizontal: 55,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#00716F",
        paddingVertical: 10,
        borderRadius: 23
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
      },
})
