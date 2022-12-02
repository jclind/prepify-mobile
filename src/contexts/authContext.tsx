import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { User as FirebaseUser } from 'firebase/auth'

import * as SplashScreen from 'expo-splash-screen'
SplashScreen.preventAutoHideAsync()

interface AuthContextInterface {
  user: FirebaseUser | null
  setUser: (val) => void
  isAuthLoaded: boolean
  setIsAuthLoaded: (setVal: boolean) => void
  isReady: boolean
  isAuthStatusLoading: boolean
  setIsAuthStatusLoading: (val: boolean) => void
}

const AuthContext = createContext<AuthContextInterface | null>(null)
export function useAuth() {
  return useContext(AuthContext)
}
type AuthProviderProps = {
  fontsLoaded: boolean
  children: React.ReactNode
}

export default function AuthProvider({
  fontsLoaded,
  children,
}: AuthProviderProps) {
  const [isReady, setIsReady] = useState<boolean>(false)
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false)
  const [isAuthStatusLoading, setIsAuthStatusLoading] = useState<boolean>(false)
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
    }
  }, [isReady])
  useEffect(() => {
    setIsReady(isAuthLoaded && fontsLoaded)
  }, [isAuthLoaded, fontsLoaded])

  const value: AuthContextInterface = {
    user,
    setUser,
    isAuthLoaded: isAuthLoaded,
    setIsAuthLoaded: setIsAuthLoaded,
    isReady,
    isAuthStatusLoading,
    setIsAuthStatusLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
