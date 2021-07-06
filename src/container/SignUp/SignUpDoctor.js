import React, { useContext, useState } from 'react';
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
import FormInput from '../../compoment/inputForm/FormInput';
import FormButton from '../../compoment/button/FormButton';
import RNPickerSelect from 'react-native-picker-select';
import { windowHeight, windowWidth } from '../../utility/dimension/Dimension';
import firebase from 'firebase'
import "firebase/firestore";
const Signup = ({ navigation }) => {
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [profile, setProfile] = useState('')
    const [formation, setFormation] = useState("");
    const [experience, setExperience] = useState("");
    const [specialite, setSpecialite] = useState("");
    const [niveauEtude, setNiveauEtude] = useState("");
    const [department, setDepartment] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const onSignUp = (props) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        displayName,
                        email,
                        address,
                        number,
                        profile: "doctor",
                        formation,
                        specialite,
                        experience,
                        niveauEtude,
                        department,
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



        <View style={{ backgroundColor: "#FFF", height: "100%" }}>

<Image source={require('../../../images/image.jpg')}
                    style={{ width: "100%", height: "24%" }}
                />
            <Text
                style={{
                    fontSize: 30,
                    fontFamily: "SemiBold",
                    alignSelf: "center",
                }}
            >Welcome to laafigram doctor</Text>
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

                <FormInput
                    placeholderText="name"
                    iconType="user"
                    keyboardType="email-address"
                    value={displayName}
                    onChangeText={(text) => setDisplayName(text)}
                />
                <FormInput
                    placeholderText="email"
                    iconType="user"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <FormInput
                    placeholderText="adresse"
                    iconType="user"
                    keyboardType="email-address"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    require
                />
                     <FormInput
                    placeholderText="code postal du cabinet ,hopital..."
                    iconType="user"
                    keyboardType="email-address"
                    value={codePostal}
                    onChangeText={(text) => setCodePostal(text)}
                    require
                />
                <FormInput
                    placeholderText="numero"
                    iconType="user"
                    keyboardType="email-address"
                    value={number}
                    onChangeText={(text) => setNumber(text)}
                    require
                />
                <FormInput
                    placeholderText="formation"
                    iconType="user"
                    keyboardType="email-address"
                    value={formation}
                    onChangeText={(text) => setFormation(text)}
                />
                <FormInput
                    placeholderText="experience"
                    iconType="user"
                    keyboardType="email-address"
                    value={experience}
                    onChangeText={(text) => setExperience(text)}
                />
               <View style={styles.row}>
                    <Text style={styles.label}>Specialité</Text>
                    <Picker
                        specialite={specialite}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue) => setNiveauEtude(itemValue)}
                    >
                        <Picker.Item label="Specialité"/>
                        <Picker.Item label="Chirrugient-dentiste" value="Chirrugient-dentiste" />
                        <Picker.Item label="Dermatologue" value="Dermatologue" />
                        <Picker.Item label="Genycologue" value="Genycologue" />
                        <Picker.Item label="Medecin Generaliste" value="MedecinGeneraliste" />
                        <Picker.Item label="Osteopath" value="Osteopath" />
                        <Picker.Item label="Cardiologue" value="Cardiologue" />
                        <Picker.Item label="Allergologue" value="Allergologue" />
                        <Picker.Item label="Stomalogue" value="Stomalogue" />
                    </Picker>
                </View> 
                <FormInput
                    placeholderText="department"
                    iconType="user"
                    keyboardType="email-address"
                    value={department}
                    onChangeText={(text) => setDepartment(text)}
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

                <FormInput
                    placeholderText="password"
                    iconType="user"
                    keyboardType="email-address"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <FormButton
                    buttonTitle="Valider"
                  onPress={onSignUp}
                />
                
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
        marginHorizontal: 55,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#00716F",
        paddingVertical: 10,
        borderRadius: 23
    },
    txtButton: {
        fontSize: 20,
        color: "#fff"
    }
})
