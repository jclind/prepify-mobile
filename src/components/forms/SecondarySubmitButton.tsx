import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppText from '../text/AppText'
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
      <AppText size='small' textColor={styleVars.secondaryText}>
        {text}
      </AppText>
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
