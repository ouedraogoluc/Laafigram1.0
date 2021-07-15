import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import moment from 'moment'



export default class LigneNews extends React.Component {
  constructor(props) {
    super(props);
    this.date = moment(this.props.date,"YYYY-MM-DDTHH:mm:ss").format("DD,MMM");
    this.navigation = props.navigation ;
    this.storyUrl = props.story_url;
  }
  handleOnclick = () => {
    
    this.navigation.navigate('DetailStory',{
     url: this.storyUrl
    })
  }
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={(this.handleOnclick)}>
        <View style={styles.row}>
          <Image style={styles.picture} source={{ uri: this.props.image_url }} />
          <View style={{ width: 250 }}>
            <Text style={styles.primaryText}>{this.props.section} {" > "} {this.props.subsection}</Text>
            <Text style={styles.primaryText}>{this.date}</Text>
            <Text style={styles.primaryText}>{this.props.title}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },

  picture: {
    width: 100,
    height: 100,
    marginRight: 18,
  },

  primaryText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    marginBottom: 4,
  },
  secondaryText: { color: "grey" },

  
});
