import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { db, auth } from '../../firebase/config';
import firebase from 'firebase'
import "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient'
const MedicalList = ({ navigation }) => {
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    }
    return (
        <View style={{
            backgroundColor: "#FFF",
            flex: 1
        }}>
            <LinearGradient
                colors={["rgba(0,164,109,0.4)", "transparent"]}
                style={{
                    left: 0,
                    right: 0,
                    height: 90,
                    marginTop: 10
                }}
            >
                <View style={{
                    backgroundColor: "#FFF",
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    marginHorizontal: 20,
                    borderRadius: 15,
                    marginTop: 25,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#b1e5d3"
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            width: 260
                        }}
                    />

                </View>
            </LinearGradient>
            <ScrollView>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                <View>
                    <Text style={styles.text}>nom </Text>

                </View>
                
            </ScrollView>

        </View>

    )
}

export default MedicalList

const styles = StyleSheet.create({})
