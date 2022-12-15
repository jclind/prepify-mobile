import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import defaultStyles from '../config/defaultStyles'
import sv from '../config/sv'

interface ButtonProps {
  title: string
  backgroundColor?: string
  textColor?: string
  style?: any
  onPress: () => void
  loading?: boolean
}

export default function Button({
  title,
  backgroundColor,
  textColor,
  onPress,
  style,
  loading,
}: ButtonProps) {
  const handlePress = () => {
    if (!loading) {
      onPress()
    }
    Keyboard.dismiss()
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor || sv.primary,
        },
        style,
      ]}
      onPress={handlePress}
    >
      {loading ? (
        <ActivityIndicator size='small' color={sv.primaryBackground} />
      ) : (
        <Text
          style={[
            defaultStyles.text,
            { color: textColor || sv.primaryBtnText },
          ]}
        >
          {title}
        </Text>
      )}
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
    height: 52,
  },
})
