import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import defaultStyles from '../config/defaultStyles'
import colors from '../config/colors'

interface TextLargeProps {
  children: React.ReactNode
  textColor?: string
  style?: any
}

export default function TextLarge({
  children,
  textColor,
  style,
}: TextLargeProps) {
  return (
    <Text
      style={[
        defaultStyles.text,
        styles.text,
        style,
        { color: textColor || colors.primaryText },
      ]}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontFamily: 'Montserrat_600SemiBold',
  },
})
