import { useState, useEffect, useCallback } from 'react'
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold_Italic,
} from '@expo-google-fonts/montserrat'

import Auth from './Auth'
import AuthProvider from './src/contexts/AuthContext'
import ChooseNavigator from './src/navigation/ChooseNavigator'

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold_Italic,
  })

  return (
    <AuthProvider fontsLoaded={fontsLoaded}>
      {/* <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          Keyboard.dismiss()
        }}
      > */}
      <View style={{ flex: 1 }}>
        <>
          <Auth />
          <ChooseNavigator />
        </>
      </View>
      {/* </Pressable> */}
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
