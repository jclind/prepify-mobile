import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../../components/layout/Screen'
import Button from '../../components/Button'
import AuthAPI from '../../api/auth'
import sv from '../../config/sv'
import UserCard from '../../components/account/UserCard'
import FormTitle from '../../components/forms/FormTitle'

export default function Account() {
  const handleLogout = () => {
    AuthAPI.logout()
  }

  return (
    <Screen style={styles.container}>
      <FormTitle style={styles.pageTitle}>Account</FormTitle>
      <View style={styles.section}>
        <UserCard />
      </View>
      <View style={styles.section}>
        <View style={styles.sectionItem}></View>
      </View>
      <Button title='Logout' onPress={handleLogout} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  section: {
    backgroundColor: sv.secondaryBackground,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: sv.borderRadius,
    marginBottom: 35,
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: 35,
  },
})
