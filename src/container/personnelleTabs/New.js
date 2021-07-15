import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import LigneNews from "./LigneNews";

export default class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
    this.navigation = props.navigation;
  }
 
  componentDidMount() {
    fetch(
      "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=sNSoTLuim2yaEwOoh7msGlEAalSYVgCt"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          stories: responseJson.results,
        });
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList

          data={this.state.stories}
          style={styles.listStyle}
          renderItem={({ item }) => (
            <LigneNews 
              subsection={item.subsection}
              title={item.title}
              date={item.published_date}
              section={item.section}
              image_url={item.multimedia[0].url}
              story_url={item.url}
              navigation={this.navigation}
            />
          )}
        >

        </FlatList>

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  listStyle: {},
});
