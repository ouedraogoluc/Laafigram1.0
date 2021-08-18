import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { Ionicons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { db, auth, storage } from '../../firebase/config'
const MyAppointment = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState([])

    function getEventData() {
        db.collection('rdv')
            .doc(auth.currentUser.uid)
            .collection('userRdv')
            .orderBy("createdAt", "desc")
            .onSnapshot((quearySnapshot) => {
                const data = []
                quearySnapshot.forEach((documentSnapshot) => {
                    data.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id
                    })
                })
                setEvent(data)
            })
    }

    useEffect(() => {
        getEventData()
        console.log(event);
        setLoading(false);
    }, [])

    function onDeleteEvent() {
        db.collection('rdv')
            .doc(auth().currentUser.uid)
            .collection('userRdv')
            .doc(selectedCardId)
            .delete()
            .catch((error) => console.log(error))
    }
    if (loading) {
        return <ActivityIndicator />;
    }
    return (
        <ScrollView>
            <View style={styles.feedItem}>
                <View style={styles.header} >

                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.input} placeholder="Enter text here..." />
                                    <TouchableOpacity style={styles.searchBtn}>
                                        <Ionicons name="ios-search" size={25} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("formulaire")}>
                            <Ionicons name="ios-add-circle" size={45} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Ionicons name="ios-flash" size={25} color="#000" />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.body}>
                <View style={styles.listWrapper}>
                            <Text style={styles.row}>patient</Text>
                            <Text style={styles.row}>Date</Text>
                            <Text style={styles.row}>Jours</Text>
                            <Text style={styles.row}>Heure</Text>
                            <Text style={styles.row}>Consultation</Text>
                            <Text style={styles.row}>Maladie</Text>
                            <Text style={styles.row}>action</Text>
                            </View>
                    <FlatList
                        data={event}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.listWrapper}>
                            
                            <Text style={styles.row}>{item.patientName}</Text>
                            <Text style={styles.row}>{item.date}</Text>
                            <Text style={styles.row}>{item.jours}</Text>
                            <Text style={styles.row}>{item.heure}</Text>
                            <Text style={styles.row}>{item.typeDeConsultation}</Text>
                            <Text style={styles.row}>{item.modif}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('formulaire', { ...item })}>
                            <Ionicons name="ios-medical" size={25} color="#000" />
                           </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default MyAppointment

const styles = StyleSheet.create({
    feedItem: {
        backgroundColor: "#FFF",
        width: "100%",
        height: "100%",
    },
    header: {
        width: "100%",
        height: 60,
        backgroundColor: "#f5f5f5",
        //backgroundColor: "red",
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    input: {
        width: '100%',
        height: 35,
        padding: 10,
        color: '#000',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: '#00716F',
        marginRight: 5,
        fontSize: 18,
        backgroundColor: "#FFF",
    },
    inputContainer: {
        width: '80%',
        height: 35,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
    },
    searchBtn: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 30,
    },
    listWrapper:{
        flexDirection:"row",
        flexWrap:'wrap',
        borderBottomWidth:.5
    },
    row:{
        backgroundColor:"#fff",
        flex:1,
        fontSize:15,
        paddingHorizontal:2,
        paddingVertical:20
    }

})