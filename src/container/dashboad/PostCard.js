import React from 'react'
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
  
  } from './style/HomeStyle'
 
  import { Ionicons, AntDesign,SimpleLineIcons } from '@expo/vector-icons';
const  PostCard=({item})=>{
   return(
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
    );
};

export default PostCard;
