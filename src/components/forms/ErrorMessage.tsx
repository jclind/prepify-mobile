import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../text/AppText'

type ErrorMessageProps = {
  error: string
  visible: boolean
}

export default function ErrorMessage({ error, visible }: ErrorMessageProps) {
  if (!visible || !error) return null

  return (
    <AppText size='small' style={styles.error}>
      {error}
    </AppText>
  )
}

const styles = StyleSheet.create({
  error: { position: 'absolute', top: -20, left: 15, color: 'red' },
})
