
import React, { Component } from 'react';
import { Alert, Button, Text,StyleSheet, TextInput, ScrollView, ActivityIndicator,Image, View } from 'react-native';
import firebase from 'firebase'
import "firebase/firestore";
import { Ionicons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,

} from 'react-native-paper';
import {
  Container, Card, UserInfo, UserImg,
  UserInfoText,
  UserName,
  PostTime,
  PostText,
  PostImg,
  Divider,
  Interaction,
  InteractionText,
  InteractionWrapper

} from '../dashboad/style/HomeStyle'

class Detail extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      profile: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          name: user.name,
          email: user.email,
          profile: user.profile,
          specialite: user.specialite,
          experience: user.experience,
          niveauEtude: user.niveauEtude,
          department: user.department,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={{ flex: 1 }}>
         <Container>
           <Card>
              <UserInfo>
                <Image source={require('../../../images/doc2.jpg')} style={styles.avatar} />
                <UserInfoText>
                  <UserName>{this.state.displayName}</UserName>
                  <PostTime>{this.state.email}</PostTime>
                </UserInfoText>
              </UserInfo>
              <PostText>{this.state.profile}</PostText>
              <PostText>{this.state.specialite}</PostText>
              <PostText>{this.state.niveauEtude}</PostText> 
              <PostText>{this.state.formation}</PostText>
              <PostText>{this.state.department}</PostText>
              <PostText>{this.state.experience}</PostText>
              
              <Divider />
              <InteractionWrapper>
                <Interaction active >
                  <Ionicons name="heart-outline" size={25} color="2e64e5" />
                  <InteractionText active> s'abonnée</InteractionText>
                </Interaction>
                <Interaction>
                  <Ionicons name="md-chatbubble-outline" size={25} />
                  <TouchableRipple 
                  onPress={() => {
                    this.props.navigation.navigate('ho')
                  }}
                 >
                    <InteractionText > renddez-vous</InteractionText>
                  </TouchableRipple>

                </Interaction>
              </InteractionWrapper>
            </Card>
         </Container>
{/* 
        <View style={styles.inputGroup}>
        <Text> {this.state.name}</Text>
        <Text> {this.state.email}</Text>
        <Text> {this.state.profile}</Text>
        <Text> {this.state.niveauEtude}</Text>
        <Text> {this.state.formation}</Text>
        <Text> {this.state.department}</Text>
        <Text> {this.state.experience}</Text>
        <Text> {this.state.specialite}</Text>
        <Text 
        onPress={() => {
          this.props.navigation.navigate('ho');
        }}
        > prendre rdv</Text>
         
        </View> */}
        
         
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
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
  button: {
    marginBottom: 7, 
  }
})

export default  Detail;