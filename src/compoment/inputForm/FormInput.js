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
        style={styles.textInput}
        numberOfLines={1  }
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
      marginBottom: 20,
  },
  label: {
      fontSize: 20
  },
  
  textInput: {
      height: 40,
      borderWidth: 0,


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
