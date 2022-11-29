import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../screens/Auth/Welcome'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'
import sv from '../config/sv'
import { MCIcons } from '../config/types/MCIcons'
import ForgotPassword from '../screens/Auth/ForgotPassword'
import Home from '../screens/App/Home'
import Recipe from '../screens/App/Recipe'

const Stack = createNativeStackNavigator()

const formHeaderStyles = () => ({
  headerShown: false,
})

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
      }}
    >
      <Stack.Screen name='Home' component={Home} options={formHeaderStyles} />
      <Stack.Screen
        name='Recipe'
        component={Recipe}
        options={formHeaderStyles}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
