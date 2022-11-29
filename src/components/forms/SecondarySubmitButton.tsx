import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppText from '../text/AppText'
import sv from '../../config/sv'

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
      <AppText size='small' textColor={sv.secondaryText}>
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
