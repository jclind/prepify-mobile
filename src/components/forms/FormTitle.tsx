import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import formStyles from '../../config/formStyles'
import AppText from '../text/AppText'

type FormTitleProps = {
  children: string
  style?: any
}

export default function FormTitle({ children, style }: FormTitleProps) {
  return (
    <AppText size='mediumLarge' style={[formStyles.title, style]}>
      {children}
    </AppText>
  )
}

const styles = StyleSheet.create({})
