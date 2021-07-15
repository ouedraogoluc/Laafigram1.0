import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import * as firebase from "firebase";
import { db, auth } from '../../firebase/config';
const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe;
  });
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Image source={require('../../../images/doc2.jpg')} style={styles.avatar} />

      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>

        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.email}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
},
});