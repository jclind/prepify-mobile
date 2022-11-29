import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import formStyles from '../../config/formStyles'
import AppText from '../text/AppText'

type FormDescriptionProps = {
  children: string
  style?: any
}

export default function FormDescription({
  children,
  style,
}: FormDescriptionProps) {
  return (
    <AppText size='medium' style={[formStyles.description, style]}>
      {children}
    </AppText>
  )
}

const styles = StyleSheet.create({})
