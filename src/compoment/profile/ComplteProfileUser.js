import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    TouchableHighlight,
    Picker,

} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase'
import "firebase/firestore";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
import FormInput from '../inputForm/FormInput';
const ComplteProfileUser = (props) => {  
    const [profile, setProfile] = useState('')
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [genre, setGenre] = useState("");
    const [dateNaiss, setDateNaiss] = useState("");
    const [formation, setFormation] = useState("");
    const [experience, setExperience] = useState("");
    const [specialite, setSpecialite] = useState("");
    const [groupeSanguin, setGroupeSsnguin] = useState("");
    const [poids, setPoids] = useState("");
    const [niveauEtude, setNiveauEtude] = useState("");
    const [department, setDepartment] = useState("");

    useEffect(() => {
       
        db.collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(docSnap => {
                setProfile(docSnap.data())
            })
    }, [])

    if (profile.profile == "doctor") {
          
        const createPatient = async () => {
            await db.collection("doctors")
                .add({
                    formation: formation,
                    specialite: specialite,
                    experience: experience,
                    niveauEtude: niveauEtude,
                    department: department,
                })
                .then(() => {
                    props.navigation.navigate("Profile");
                    
                })
              
                .catch((error) => alert(error));
        }
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container} enabled>
                    <FormInput
                       placeholderText="formation"
                       iconType="user"
                       keyboardType="email-address"
                       value={formation}
                       onChangeText={(text)=>setFormation(text)}
                    />
                    <FormInput
                       placeholderText="experience"
                       iconType="user"
                       keyboardType="email-address"
                       value={experience}
                       onChangeText={(text)=>setExperience(text)}
                    />     
                         <FormInput
                       placeholderText="specialite"
                       iconType="user"
                       keyboardType="email-address"
                       value={specialite}
                       onChangeText={(text)=>setSpecialite(text)}
                    />   
                   <FormInput
                       placeholderText="department"
                       iconType="user"
                       keyboardType="email-address"
                       value={department}
                       onChangeText={(text)=>setDepartment(text)}
                    />       
                    <View style={styles.row}>
                        <Text style={styles.label}>Niveau Etude</Text>
                        <Picker
                            niveauEtude={niveauEtude}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue) => setNiveauEtude(itemValue)}
                        >
                            <Picker.Item label="BAC+1" value="BAC+1" />
                            <Picker.Item label="BAC+2" value="BAC+2" />
                            <Picker.Item label="BAC+3" value="BAC+3" />
                            <Picker.Item label="BAC+4" value="BAB+4" />
                            <Picker.Item label="BAC+5" value="BAC+5" />
                            <Picker.Item label="BAC+6" value="BAC+6" />
                            <Picker.Item label="BAC+7" value="BAC+7" />
                        </Picker>
                    </View>
                    <View style={styles.btnContainer}>
                    <Text style={styles.txtButton}
                        onPress={createPatient}
                    >valider</Text>
                    </View>
                </KeyboardAvoidingView>

            </ScrollView>
        )
    } else if (profile.profile == "patient") {
        const createPatient = async () => {
            await db.collection("patients")
                .add({
                    uid:this.uid,
                    groupeSanguin: groupeSanguin,
                    dateNaiss: dateNaiss,
                    genre: genre,
                    poids: poids,
                })
                .then(() => {
                    props.navigation.navigate("Profile");
                    
                })
                .catch((error) => alert(error));
        }
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container} enabled>
                <View style={styles.row}>
                        <Text style={styles.label}>genre</Text>
                        <Picker
                            genre={genre}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue) => setGenre(itemValue)}
                        >
                            <Picker.Item label="M" value="M" />
                            <Picker.Item label="F" value="F" />
                        </Picker>
                    </View>
                    <FormInput
                       placeholderText="date de naissance"
                       iconType="user"
                       keyboardType="email-address"
                       value={dateNaiss}
                       onChangeText={(text)=>setDateNaiss(text)}
                    />
                    <FormInput
                       placeholderText="poids"
                       iconType="user"
                       keyboardType="email-address"
                       value={poids}
                       onChangeText={(text)=>setPoids(text)}
                    />               
                    <View style={styles.row}>
                        <Text style={styles.label}>groupeSanguin</Text>
                        <Picker
                            groupeSanguin={groupeSanguin}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => setGroupeSsnguin(itemValue)}
                        >
                            <Picker.Item label="O-" value="O-" />
                            <Picker.Item label="A-" value="A-" />
                            <Picker.Item label="A+" value="A+" />
                            <Picker.Item label="AB+" value="AB+" />
                            <Picker.Item label="B+" value="B+" />
                            <Picker.Item label="B-" value="B-" />
                            <Picker.Item label="AB-" value="AB-" />
                        </Picker>
                    </View>
                    <View style={styles.btnContainer}>
                    <Text style={styles.txtButton}
                        onPress={createPatient}
                    >valider</Text>
                    </View>
                </KeyboardAvoidingView>

            </ScrollView>
        )
    } else {
        return (
            <View>
                <Text style={styles.text}>nom - {profile.name}</Text>
                <Text style={styles.text}>address - {profile.email}</Text>
                <Text style={styles.text}>type - {profile.profile}</Text>
            </View>
        )
    }

   
}

export default ComplteProfileUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    row: {
        marginBottom: 20,
    },
    label: {
        fontSize: 20
    },
    textInput: {
        height: 40,
        borderWidth: 0,
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
      },
    btnContainer: {
        backgroundColor: '#1A8',
        padding: 10,
        alignItems: 'center',
    },
    txtButton: {
        fontSize: 20,
        color: "#fff"
    }
})
