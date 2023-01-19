import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../../../text/AppText'

type AddRecipeInputTitleProps = {
  title: string
  style?: any
}

export default function AddRecipeInputTitle({
  title,
  style,
}: AddRecipeInputTitleProps) {
  return (
    <AppText size='medium' style={[styles.text, style]}>
      {title}
    </AppText>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 5,
  },
})
