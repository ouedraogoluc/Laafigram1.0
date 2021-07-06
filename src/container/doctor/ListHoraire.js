import React, { useState, useEffect } from 'react'
import { StyleSheet,FlatList , ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase'
import "firebase/firestore";

const ListHoraire = (props) => {
    const [user, setUser] = useState(null);
    const [userHoraire, setUserHoraire] = useState([]);

    useEffect(() => {
        const { currentUser, horaire } = props;
        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(horaire)
        } else {
            firebase.firestore()
                .collection("horaires")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    let Horaires = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserHoraire(Horaires)
                })
        }

    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userHoraire}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>

                            <Text>{item.name}</Text>
                            <Text>{item.email}</Text>
                        </View>

                    )}

                />
            </View>
        </View>
    )
    
}

export default ListHoraire

const styles = StyleSheet.create({})
