import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { db, auth } from '../../firebase/config';
import Icon from '@expo/vector-icons/AntDesign';
import firebase from 'firebase'
import "firebase/firestore";
import {Container,Card,UserInfo,UserImg,
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
 
  import { Ionicons, AntDesign,SimpleLineIcons } from '@expo/vector-icons';

const GetPatient = () => {
   const [ loading, setLoading ] = useState(true);
  const [ patient, setPatient ] = useState([]);

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
      
    });
  }, []);
    return (
        <Card>
        <UserInfo>
           <UserImg source={item.userImg}/>
           <UserInfoText>
           <UserName>{item.userName}</UserName>
           <PostTime>{item.postTime}</PostTime>
           </UserInfoText>
        </UserInfo>
        <PostText>{item.post}</PostText>
              {item.postImg != 'none' ? <PostImg source ={item.postImg}/> : <Divider/> }
             <Divider/>
        <InteractionWrapper>
           <Interaction active >
             <Ionicons name="heart-outline" size={25} color="2e64e5" />
             <InteractionText active>12 likes</InteractionText>
           </Interaction>
           <Interaction>
             <Ionicons name="md-chatbubble-outline" size={25} />
             <InteractionText>comments</InteractionText>
           </Interaction>
           <Interaction>
             <Ionicons name="md-share-social-outline" size={25} />
             <InteractionText>share</InteractionText>
           </Interaction>
       </InteractionWrapper>
     </Card>
    )
}

export default GetPatient

const styles = StyleSheet.create({})
