import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'
import styleVars from '../../config/styleVars'

interface ScreenProps {
  children: React.ReactNode
  style?: any
}

export default function Screen({ children, style }: ScreenProps) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: styleVars.primaryBackground,
    flex: 1,
  },
  view: {
    flex: 1,
    width: '100%',
  },
})
