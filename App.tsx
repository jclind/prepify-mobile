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

import Welcome from './src/screens/Welcome'
import Register from './src/screens/Register'
import Login from './src/screens/Login'

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

  const onLayoutRootView = useCallback(async () => {
    if (isReady && fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [isReady])

  useEffect(() => {
    setIsReady(!!fontsLoaded)
  }, [fontsLoaded])

  if (!isReady) return null

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View onLayout={onLayoutRootView} style={styles.container}>
        <Login />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
