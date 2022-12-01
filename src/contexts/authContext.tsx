import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import { User as FirebaseUser } from 'firebase/auth'

interface AuthContextInterface {
  user: FirebaseUser | null
  setUser: (val) => void
  isAuthStatusLoading: boolean
  setIsAuthStatusLoading: (setVal: boolean) => void
}

const AuthContext = createContext<AuthContextInterface | null>(null)
const [user, setUser] = useState<FirebaseUser | null>(null)
const [isAuthStatusLoading, setIsAuthStatusLoading] = useState<boolean>(false)
export function useAuth() {
  return useContext(AuthContext)
}

export default function authContext() {
  const value: AuthContextInterface = {
    user,
    setUser,
    isAuthStatusLoading,
    setIsAuthStatusLoading,
  }

  return (
    <AuthContext.Provider value={value}>
      <Text>authContext</Text>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({})
