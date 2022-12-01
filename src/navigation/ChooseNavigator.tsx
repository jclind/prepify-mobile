import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'

export default function ChooseNavigator({ user, isAuthStatusLoading }) {
  return (
    <NavigationContainer>
      {user && !isAuthStatusLoading ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
