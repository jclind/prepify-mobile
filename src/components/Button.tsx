import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import defaultStyles from '../config/defaultStyles'
import colors from '../config/colors'

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
          backgroundColor: backgroundColor || colors.primary,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          defaultStyles.text,
          styles.text,
          { color: textColor || colors.primaryBtnText },
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
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_600SemiBold',
  },
})