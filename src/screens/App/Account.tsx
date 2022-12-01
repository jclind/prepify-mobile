import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../../components/layout/Screen'
import Button from '../../components/Button'
import AuthAPI from '../../api/auth'

export default function Account() {
  const handleLogout = () => {
    AuthAPI.logout()
  }

  return (
    <Screen>
      <Button title='Logout' onPress={handleLogout} />
    </Screen>
  )
}

const styles = StyleSheet.create({})
