import React from 'react';
import { StyleSheet, Text, View ,StatusBar ,Button } from 'react-native';
import { Header , ListItem, Avatar  } from 'react-native-elements';
export default function NotificationScreen() {
    
  const list = [
    {
      name: 'Dharmik Tank',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: 'Laravel Devloper'
    },
    {
      name: 'Mehul Bagada',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: 'React Native Devloper'
    },
    {
      name: 'Bhavesh Sonagra',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: 'Designer'
    },
    ,
    {
      name: 'keval kashiyani',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: 'PHP Devloper'
    },
  ]
  return (
    <View style={styles.container}>
{/*         <Header
        barStyle="light-content" 
        leftComponent={{ icon: 'menu', color: '#fff',paddingTop: 10 }}
        centerComponent={{ text: 'King Infotech.', style: { color: '#fff' ,paddingTop: 10 } }}
        rightComponent={{ icon: 'logout', color: '#fff' ,paddingTop: 10 }}
         containerStyle={{
          backgroundColor: '#f4554a',
          justifyContent: 'space-around',
        }}
      /> */}
       <StatusBar
        animated={true}
        backgroundColor="#f4554a"
      />
      <View style={styles.mainbox}>
        {
          list.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar source={{uri: l.avatar_url}} />
              <ListItem.Content>
                <ListItem.Title onPress={()=>{}}>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))
        }
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textinfo:{
    margin:10, 
    textAlign: 'center',
    fontSize: 17,    
  },
});