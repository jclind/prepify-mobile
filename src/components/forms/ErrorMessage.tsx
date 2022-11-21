import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextSmall from '../TextSmall'

type ErrorMessageProps = {
  error: string
  visible: boolean
}

export default function ErrorMessage({ error, visible }: ErrorMessageProps) {
  console.log(error, visible)

  if (!visible || !error) return null

  return <TextSmall style={styles.error}>{error}</TextSmall>
}

const styles = StyleSheet.create({
  error: { position: 'absolute', top: -20, left: 15, color: 'red' },
})
