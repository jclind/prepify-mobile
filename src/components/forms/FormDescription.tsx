import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import formStyles from '../../config/formStyles'
import AppText from '../text/AppText'

type FormDescriptionProps = {
  children: string
  style?: any
  numberOfLines?: number
}

export default function FormDescription({
  children,
  style,
  numberOfLines,
}: FormDescriptionProps) {
  return (
    <AppText
      size='medium'
      style={[formStyles.description, style]}
      numberOfLines={numberOfLines || 2}
    >
      {children}
    </AppText>
  )
}

const styles = StyleSheet.create({})
