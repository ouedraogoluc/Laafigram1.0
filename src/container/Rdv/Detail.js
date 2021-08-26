
import React, { Component } from 'react';
import { Alert, Button, Text,StyleSheet, TextInput, ScrollView, ActivityIndicator,Image, View } from 'react-native';
import firebase from 'firebase'
import "firebase/firestore";
import Modal from "react-native-modal";
import eventTab from '../../modal/eventModal';
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
  state = {  
    isVisible: false, //state of modal default false  
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
              <PostText>statut:{this.state.profile}</PostText>
              <PostText>Specialité:{this.state.specialite}</PostText>
              <PostText>Niveau Etude:{this.state.niveauEtude}</PostText> 
              <PostText>Formation:{this.state.formation}</PostText>
              <PostText>Departement:{this.state.department}</PostText>
              <PostText>Experience:{this.state.experience}</PostText>
              
              <Divider />
              <InteractionWrapper>
               
                <Interaction>
                  <Ionicons name="md-chatbubble-outline" size={25} />
               
                  <TouchableRipple 
                  //  onPress={() => { setVisible(true); }}
                 >
                    <InteractionText
                    
                    > renddez-vous</InteractionText>
                    
                  </TouchableRipple>
                  
                </Interaction>
                
              </InteractionWrapper>
            </Card>
         </Container>

 
        
        
         
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
  },
  modal: {  
    justifyContent: 'center',  
    alignItems: 'center',   
    backgroundColor : "#00BCD4",   
    height: 300 ,  
    width: '80%',  
    borderRadius:10,  
    borderWidth: 1,  
    borderColor: '#fff',    
    marginTop: 80,  
    marginLeft: 40,  
     
     },  
     text: {  
        color: '#3f2949',  
        marginTop: 10  
     }  
})

export default  Detail;