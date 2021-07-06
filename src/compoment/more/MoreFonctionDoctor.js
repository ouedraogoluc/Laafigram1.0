import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, ScrollView ,ActivityIndicator} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,

} from 'react-native-paper';
import { Ionicons, AntDesign, Fontisto } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase'
import "firebase/firestore";

    
const MoreFonctionDoctor= ({navigation}) => {
    const [users, setUsers] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const signOutUser =()=>{
        auth.signOut().then(()=>{
            navigation.replace("Login");
        });
    }
    
    const [profile, setProfile] = useState('')
    useEffect(() => {
        const users = [];
        db.collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(docSnap => {
                setProfile(docSnap.data())

            })
            
            setUsers(users);
            setLoading(false);
    }, []);
    if (loading) {
        return <ActivityIndicator />;
      }

    return (
        <ScrollView>
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <TouchableRipple   onPress={() =>navigation.navigate('Profile')}>
                <Avatar.Image
                        source={{
                            uri: 'https://img.freepik.com/vecteurs-libre/contexte-du-docteur_1270-84.jpg?size=338&ext=jpg&ga=GA1.2.699125266.1619654400',
                        }}
                        size={80}
                      
                    />
                </TouchableRipple>
                  
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>{profile.name}</Title>
                        <Caption style={styles.title}>{profile.email}</Caption>
                        <Caption style={styles.title}>{profile.profile}</Caption>

                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Senegal Dakar</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>ouedraogo luc</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>ouedraogo@email.com</Text>
                </View>
            </View>
            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Ionicons name="ios-notifications-circle-outline" color="#FF6347" size={25} />
                    <Caption onPress={() => { }}>25</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Ionicons name="ios-document" color="#FF6347" size={25} />
                    <Caption onPress={() => { }}>23</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => navigation.navigate('CompleteProfile')}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Finaliser mon profile</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Mes Rendez-vous</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Mes consultations</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="share-outline" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Programmer mes avenements</Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="ios-document-attach" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>dossier medical</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Ionicons name="ios-document-attach" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Definir mes horaires de travail</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Ionicons name="ios-document-attach" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Teleconference</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple  onPress={signOutUser}>
                    <View style={styles.menuItem}>
                        <Ionicons name="ios-document-attach" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Deconnecter</Text>
                    </View>
                </TouchableRipple>
                
            </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default MoreFonctionDoctor
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#00716F',
        borderBottomWidth: 1,
        borderTopColor: '#00716F',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#00716F',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});