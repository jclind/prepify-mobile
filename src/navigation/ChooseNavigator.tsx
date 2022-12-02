import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'
import { useAuth } from '../contexts/AuthContext'

export default function ChooseNavigator() {
  const { user, isReady, isAuthStatusLoading } = useAuth()

  if (!isReady) return null

  return (
    <NavigationContainer>
      {user && !isAuthStatusLoading ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
