import { StyleSheet, Text, TextProps, View } from 'react-native'
import React from 'react'
import defaultStyles from '../../config/defaultStyles'
import sv from '../../config/sv'

const SIZES = {
  small: { fontSize: 14, fontFamily: 'Montserrat_400Regular' },
  mediumSmall: { fontSize: 16, fontFamily: 'Montserrat_500Medium' },
  medium: { fontSize: 18, fontFamily: 'Montserrat_500Medium' },
  mediumLarge: { fontSize: 22, fontFamily: 'Montserrat_600SemiBold' },
  large: { fontSize: 32, fontFamily: 'Montserrat_600SemiBold' },
}

type Size = keyof typeof SIZES

type AppTextProps = {
  children: React.ReactNode
  textColor?: string
  style?: any
  size?: Size
  numberOfLines?: number
}

export default function AppText({
  children,
  textColor,
  style,
  size = 'medium',
  numberOfLines = 1,
}: AppTextProps) {
  const selectedSizeStyles = SIZES[size]

  return (
    <Text
      style={[
        defaultStyles.text,
        styles.text,
        {
          color: textColor || sv.primaryText,
          ...selectedSizeStyles,
          lineHeight:
            numberOfLines > 1 ? selectedSizeStyles.fontSize * 1.7 : 'default',
        },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {},
})
