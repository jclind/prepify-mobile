import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import defaultStyles from '../config/defaultStyles'
import sv from '../config/sv'

interface ButtonProps {
  title: string
  backgroundColor?: string
  textColor?: string
  style?: any
  onPress: () => void
}

export default function Button({
  title,
  backgroundColor,
  textColor,
  onPress,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor || sv.primary,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          defaultStyles.text,
          styles.text,
          { color: textColor || sv.primaryBtnText },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
  },
  text: {
    // fontFamily: 'Montserrat_600SemiBold',
  },
})
