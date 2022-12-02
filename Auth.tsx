import React, { useEffect } from 'react'
import { auth } from './src/api/firebase'
import { useAuth } from './src/contexts/AuthContext'

export default function Auth() {
  const { setUser, setIsAuthLoaded } = useAuth()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setIsAuthLoaded(true)
    })
    return () => unsubscribe()
  }, [])

  return null
}
