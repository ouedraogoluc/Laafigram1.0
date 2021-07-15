
import { useState } from 'react'
import { StyleSheet, Text,ScrollView ,Button ,ActivityIndicator , TextInput,View } from 'react-native'
import firebase from 'firebase'
import "firebase/firestore";
import { db, auth } from '../../firebase/config';

import React, { Component } from 'react'

export class RendezVous extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('rdv')

    this.state = {
      name: '',
      email2: '',
      mobile: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() {
    if(this.state.name === ''){
     alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        uid:this.uid,
        name: this.state.name,
        email: auth.currentUser.email,
        email2: this.state.email2,
        mobile: this.state.mobile,
      }).then((res) => {
        this.setState({
          name: '',
          email2: '',
          mobile: '',
          isLoading: false,
          email: auth.currentUser.email,
          address: auth.currentUser.address,
        });
        this.props.navigation.navigate('UserScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
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
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'jours'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'heure'}
              value={this.state.email2}
              onChangeText={(val) => this.inputValueUpdate(val, 'email2')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'type de consultion'}
              value={this.state.mobile}
              onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'modif de consultation'}
              value={this.state.mobile}
              onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Valider'
            onPress={() => this.storeUser()} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
  get uid(){
    return (firebase.auth().currentUser || {}).uid;
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
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default RendezVous