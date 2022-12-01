import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, createContext, useContext } from 'react'
import { auth } from './src/api/firebase'

import ChooseNavigator from './src/navigation/ChooseNavigator'
import { useAuth } from './src/contexts/authContext'

type AuthProps = {
  setIsReady: (isReady: boolean) => void
}

export default function Auth({ setIsReady }: AuthProps) {
  const { setUser } = useAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setIsReady(true)
    })
    return () => unsubscribe()
  }, [])

  return null
}

const styles = StyleSheet.create({})
