import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../../../text/AppText'

type AddRecipeInputTitleProps = {
  title: string
}

export default function AddRecipeInputTitle({
  title,
}: AddRecipeInputTitleProps) {
  return (
    <AppText size='medium' style={styles.text}>
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
