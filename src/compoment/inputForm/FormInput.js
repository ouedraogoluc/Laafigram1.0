import React from 'react';
import { View, TextInput, StyleSheet ,Text} from 'react-native';
import { windowHeight, windowWidth } from '../../utility/dimension/Dimension';
import AntDesign from 'react-native-vector-icons/AntDesign';
const FormInput = ({ labelValue, placeholderText, iconType, ...rest }) => {
  return (
    <View style={styles.row}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      <TextInput
      
      style={{ paddingHorizontal: 20, fontSize: 15, color: "#ccccef" }}
        numberOfLines={2}
        placeholder={placeholderText}
        placeholderTextColor="#808080"
        underlineColorAndroid="blue"
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2
  },
  label: {
      fontSize: 20
  },
  
  textInput: {
    width:"100%",
      height: 40,
      borderWidth: 0,
      marginHorizontal: 55,

  },
  btnContainer: {
      backgroundColor: '#1A8',
      padding: 10,
      alignItems: 'center',
  },
  txtButton: {
      fontSize: 20,
      color: "#fff"
  }
})
