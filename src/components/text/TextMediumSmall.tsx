import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import defaultStyles from '../../config/defaultStyles'
import styleVars from '../../config/styleVars'

interface TextLargeProps {
  children: React.ReactNode
  textColor?: string
  style?: any
}

export default function TextMediumSmall({
  children,
  textColor,
  style,
}: TextLargeProps) {
  return (
    <Text
      style={[
        defaultStyles.text,
        styles.text,
        { color: textColor || styleVars.primaryText },
        style,
      ]}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    // fontFamily: 'Montserrat_500Regular',
  },
})
