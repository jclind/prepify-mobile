import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, createContext, useContext } from 'react'
import { auth } from './src/api/firebase'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './src/navigation/AuthNavigator'
import Home from './src/screens/App/Home'
import AppNavigator from './src/navigation/AppNavigator'
import { User as FirebaseUser } from 'firebase/auth'

interface AuthContextInterface {
  user: FirebaseUser | null
}

const AuthContext = createContext<AuthContextInterface | null>(null)
export function useAuth() {
  return useContext(AuthContext)
}

type AuthProps = {
  setIsAuthLoaded: (isReady: boolean) => void
  isReady: boolean
}

export default function Auth({ setIsAuthLoaded, isReady }: AuthProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        console.log('here 1')
      } else {
        setUser(null)
        console.log('here 2')
      }
      setIsAuthLoaded(true)
      console.log('here 3')
    })
    return () => unsubscribe()
  }, [])

  const value: AuthContextInterface = {
    user,
  }

  if (!isReady) return null

  return (
    <AuthContext.Provider value={value}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({})
