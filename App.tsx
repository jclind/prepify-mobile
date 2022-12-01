import { useState, useEffect, useCallback } from 'react'
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold_Italic,
} from '@expo-google-fonts/montserrat'
import Auth from './Auth'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false)

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold_Italic,
  })

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
    }
  }, [isReady])

  // useEffect(() => {
  //   setIsReady(isAuthLoaded && fontsLoaded)
  // }, [isAuthLoaded, fontsLoaded])

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Auth setIsReady={setIsReady} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
