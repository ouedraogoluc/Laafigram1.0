import React, { useLayoutEffect, useState } from "react";
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    Text,
    Keyboard,
    View,
} from "react-native";
import { Avatar } from "react-native-elements";
import { SafeAreaView, Image } from "react-native";
import * as firebase from "firebase";
import { db, auth } from '../../firebase/config';
const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    useLayoutEffect(() => {

        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitleStyle: { color: "#fff" },
            headerStyle: { backgroundColor: '#00716F' },
            hearderTintColor: "#fff",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <Image source={require('../../../images/doc2.jpg')} style={styles.avatar} />

                    <Text
                        style={{ color: "white", marginLeft: 10, fontWeight: '700' }}
                    >{route.params.ChatName}</Text>

                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20

                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='phone' size={24} color='#fff' />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate("video")}>
                        <Ionicons name='ios-videocam' size={24} color='#fff' />
                    </TouchableOpacity>
                </View>
            ),
        })

    }, [navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection("chats").doc(route.params.id).collection("messages").add({
            // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            //photoURL: auth.currentUser.photoURL,
        });
        setInput("");
    };

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(route.params.id)
            .collection("messages")
            .onSnapshot((snapshot) =>
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            );
        return unsubscribe;
    }, [route]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style='light' />
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {messages.map(({ id, data }) =>
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Image source={require('../../../images/doc2.jpg')} style={styles.avatar} />

                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Image source={require('../../../images/doc2.jpg')} style={styles.avatar} />

                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.email}</Text>
                                    </View>
                                )
                            )}
                        </ScrollView>

                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                                placeholder="Taper message"
                                style={styles.textInput}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="blue" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    container: { flex: 1 },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        position: "relative",
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
});
