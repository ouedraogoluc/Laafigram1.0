import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = (id,chatName,enterChat) => {
    return (
        <ListItem>
            <Avatar
                rounded
                source={{
                    uri:
                        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.echosdunet.net%2Fdossiers%2Fmeilleur-smartphone%2Fphoto&psig=AOvVaw27qfuPchPy2GKSIWZW8x8B&ust=1621457538907000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDMzaSA1PACFQAAAAAdAAAAABAD",
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    youtub chat
             </ListItem.Title>
             <ListItem.Subtitle>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex impedit quia, cum odio aperiam delectus deleniti voluptatibus amet explicabo nisi deserunt consectetur placeat error magnam molestias iste vero temporibus odit?
             </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>

    )
}

export default CustomListItem

const styles = StyleSheet.create({

    
})
