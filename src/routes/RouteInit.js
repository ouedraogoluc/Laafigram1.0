import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../container/SignIn/SignIn'
import Signup from '../container/SignUp/SignUp'
import Demo from '../container/SignUp/Demo'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Stack = createStackNavigator();
const RouteInit = ({navigation}) => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={SignIn}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={({ navigation }) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#f9fafd',
                shadowColor: '#f9fafd',
                elevation: 0,
              },
              headerLeft: () => (
                <View style={{ marginLeft: 10 }}>
                  <FontAwesome.Button
                    name="long-arrow-left"
                    size={25}
                    backgroundColor="#f9fafd"
                    color="#333"
                    onPress={() => navigation.navigate('Login')}
                  />
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default RouteInit

const styles = StyleSheet.create({})
