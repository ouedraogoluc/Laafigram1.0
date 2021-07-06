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
import DatePicker from 'react-native-datepicker'
import FormInput from '../../compoment/inputForm/FormInput';
import FormButton from '../../compoment/button/FormButton';
import { windowHeight, windowWidth } from '../../utility/dimension/Dimension';
import firebase from 'firebase'
import "firebase/firestore";
const Signup = ({ navigation }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [genre, setGenre] = useState("");
    const [dateNaiss, setDateNaiss] = useState("");
    const [groupeSanguin, setGroupeSsnguin] = useState("");
    const [poids, setPoids] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const onSignUp = (props) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email,
                        profile: 'patient',
                        groupeSanguin,
                        dateNaiss,
                        genre,
                        poids,
                        address,
                        number
                    })
                console.log(result)
            }).then(() => {
                props.navigation.navigate("Home");

            })
            .catch((error) => {
                console.log(error)
            })
    };
    return (
        <View style={styles.container}>
            <Image source={require('../../../images/image.jpg')}
                style={{ width: "100%", height: "24%" }}
            />
            <Text
                style={{
                    fontSize: 30,
                    fontFamily: "SemiBold",
                    alignSelf: "center",
                }}
            >Welcome to laafigram patient</Text>
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
                    value={name}
                    onChangeText={(text) => setName(text)}
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
                />
                <FormInput
                    placeholderText="numero"
                    iconType="user"
                    keyboardType="email-address"
                    value={number}
                    onChangeText={(text) => setNumber(text)}
                />
                <FormInput
                    placeholderText="poids"
                    iconType="user"
                    keyboardType="email-address"
                    value={poids}
                    onChangeText={(text) => setPoids(text)}
                />
                <View style={styles.row}>
                    <Text style={styles.label}>groupeSanguin</Text>
                    <Picker
                        groupeSanguin={groupeSanguin}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setGroupeSsnguin(itemValue)}
                    >
                        <Picker.Item label=" groupe sanguin" />
                        <Picker.Item label="O-" value="O-" />
                        <Picker.Item label="A-" value="A-" />
                        <Picker.Item label="A+" value="A+" />
                        <Picker.Item label="AB+" value="AB+" />
                        <Picker.Item label="B+" value="B+" />
                        <Picker.Item label="B-" value="B-" />
                        <Picker.Item label="AB-" value="AB-" />
                    </Picker>
                </View>
                <FormInput
                    placeholderText="date de naissance"
                    iconType="user"
                    keyboardType="email-address"
                    value={dateNaiss}
                    onChangeText={(text) => setDateNaiss(text)}
                />
                <View style={styles.row}>
                    <Text style={styles.label}>genre</Text>
                    <Picker
                        genre={genre}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue) => setGenre(itemValue)}
                    >
                        <Picker.Item label="Sexe" />
                        <Picker.Item label="M" value="M" />
                        <Picker.Item label="F" value="F" />
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
    row: {
        marginBottom: 20,
    },
    label: {
        margin: 8,
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
