import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from './text/AppText'

type PageTitleProps = {
  children: string
  style?: any
}

export default function PageTitle({ style, children }: PageTitleProps) {
  return (
    <AppText size='mediumLarge' style={[styles.title, style]}>
      {children}
    </AppText>
  )
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
  },
})
