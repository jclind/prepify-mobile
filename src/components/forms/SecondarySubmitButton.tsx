import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextSmall from '../text/TextSmall'
import styleVars from '../../config/styleVars'

type SecondarySubmitButtonProps = {
  text: string
  onPress: () => void
}

export default function SecondarySubmitButton({
  text,
  onPress,
}: SecondarySubmitButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <TextSmall textColor={styleVars.secondaryText}>{text}</TextSmall>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
    padding: 5,
  },
})
