import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase'
import { Ionicons, AntDesign, Fontisto,Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Profile = ({ navigation, route }) => {
  const [uploading, setUploading] = useState("")
  const [image, setImage] = useState(null)
  let id = route.params?.id
  const uid = auth.currentUser.uid

  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState([])
  //RECUPERATION DES POSTS
  function getEventData() {
    console.log('====================================');
    console.log(uid);
    console.log('====================================');
    db.collection('posts')
   // .where("email"===uid)
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

//UPLOAD IMAGE

  useEffect(() => {
    (
      async () => {
        if (Platform.OS !== 'web') {
          const {
            status
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("sorry")
          }
        }
      }
    )();
    if (id) {
      getProfileData(id)
    }
  }, [id])

  function onCheck() {
    if (id) {
      onUpdate(id)
      return
    }
    onCreate()
  }
/* 
  function getProfileData(id) {
    db.collection('profile')
      .doc(uid)
      .collection('userProfile')
      .doc(id)
      .get()
      .then((snapshot) => {
        const data = snapshot.data()
        setJours(data.jours)
      })
  }
  const onCreate = async ({ localUri }) => {
    const removeUri = await this.uploadImage(localUri)
    try {
      db.collection('profile')
        .doc(uid)
        .collection('userProfile')
        .add({
          image: removeUri,
          //createdAt: firebase.firestore.FieldValue.serverTimestamp()
          createdAt: new Date().toISOString()
        })
      setLoading(false)
    } catch (err) {
      alert("something went wrong")
    }


  }
 */

  const pickImageAndUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri)
    }
  };

  const uploadImage = async () => {
    const blod = await new Promise((resolve, reject) => {
      try {
        db.collection('profile')
          .doc(uid)
          .collection('userProfile')
          .add({
            image: removeUri,
            //createdAt: firebase.firestore.FieldValue.serverTimestamp()
            createdAt: new Date().toISOString()
          })
      } catch (error) {

      }
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(xhr.response);
      };
      xhr.responseType = 'blob',
        xhr.open('Get', image, true);
      xhr.send(null)
    });
    const ref = firebase.storage().ref(`userProfiles/${firebase.auth().currentUser.uid}`).child(new Date().toISOString())
    const snapshot = ref.put(blod)

    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      setUploading(true)
    },
      (error) => {
        setUploading(false)
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        blod.close();
        return
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false)
          console.log('download url :', url);
          // blod.close();
          return url;
        })
      }
    );
  }

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View
        style={{ width: "100%", height: "50%", backgroundColor: "#eceff1" }}
      >
        <Image
          style={styles.userImg}
          source={{
            uri: image
          }} />
        <View style={styles.container} enabled>
          <TouchableOpacity onPress={pickImageAndUpload}>
          <Ionicons name="ios-camera" size={24} color="#000"/>
          </TouchableOpacity>

          {!uploading ? <Button title="upload" onPress={uploadImage} /> : <ActivityIndicator size="large" color="#000" />}
        </View>
        <Text style={styles.userName}>luc</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <View style={styles.uaboutUserserInfoItem}>
          <TouchableOpacity onPress={() => navigation.navigate("apropos")}>
            <Text style={styles.userInfoTitle}
            >Apropos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoItem}>
          <TouchableOpacity onPress={() => navigation.navigate("photoScreen")}>
            <Text style={styles.userInfoTitle}>Photos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoItem}>
          <TouchableOpacity onPress={() => navigation.navigate('videoScreen')}>
            <Text style={styles.userInfoTitle}>Video</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoItem}>
          <TouchableOpacity onPress={() => navigation.navigate('dossierMedicalScreen')}>
            <Text style={styles.userInfoTitle}>Dossier Medical</Text>
          </TouchableOpacity>

        </View>
      </View>
      <ScrollView>
        <FlatList

          data={event}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            
            <View style={styles.feedItem}>
                              
            <Image source={require('../../../images/doc2.jpg')} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={styles.name}>{item.email}</Text>
                  <Text style={styles.name}>{item.name}</Text>
                   <Text style={styles.timestamp}> il ya {typeof item.createdAt === 'string' ? formatDate(item.createdAt): 'Autre format'}</Text> 
                </View>
                <Feather name="more-horizontal" size={24} color="#73788B" />
              </View>
              <Text style={styles.post}>{item.text}</Text>
              <Image source={{
                uri:item.image
              }} style={styles.postImage} resizeMode="cover" />
                 <View style={{ flexDirection: "row" }}>
                <Ionicons name="heart-outline" size={25} color="2e64e5" style={{ marginRight: 16 }} />
                <Ionicons name="md-chatbubble-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
                <Ionicons name="md-share-social-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
              </View>
            </View>
           
            </View> 
          )}

        />
        
      </ScrollView>

    </View>

  );
}

export default Profile
function formatDate(date) {
  const d = new Date(date)
  function pad(n) { return n < 10 ? '0' + n : n }
  return pad(d.getUTCMonth() + 1) + '-'
    + d.getUTCFullYear() + '-'
    + pad(d.getUTCMinutes()) + ':'
    + pad(d.getUTCSeconds()) + 'Z'
    + pad(d.getUTCHours()) + ':'
    + pad(d.getUTCDate()) + 'T'
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#333333',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 25,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
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
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 200,
    borderRadius: 5,
    marginVertical: 16
  }
});
