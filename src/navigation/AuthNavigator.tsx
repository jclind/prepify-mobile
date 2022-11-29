import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../screens/Auth/Welcome'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'
import sv from '../config/sv'
import { MCIcons } from '../config/types/MCIcons'
import ForgotPassword from '../screens/Auth/ForgotPassword'

const Stack = createNativeStackNavigator()

const formHeaderStyles = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: sv.primaryBackground,
  },
  headerShadowVisible: false,
  headerTintColor: sv.primaryText,
  title: '',
  headerLeft: props => (
    <MCIcons
      name={'arrow-left'}
      size={28}
      color={sv.secondaryText}
      onPress={() => navigation.goBack()}
    />
  ),
})

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
      }}
    >
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Login' component={Login} options={formHeaderStyles} />
      <Stack.Screen
        name='Register'
        component={Register}
        options={formHeaderStyles}
      />
      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPassword}
        options={formHeaderStyles}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
