import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextMediumLarge from '../text/TextMediumLarge'
import formStyles from '../../config/formStyles'

type FormTitleProps = {
  children: string
  style?: any
}

export default function FormTitle({ children, style }: FormTitleProps) {
  return (
    <TextMediumLarge style={[formStyles.title, style]}>
      {children}
    </TextMediumLarge>
  )
}

const styles = StyleSheet.create({})
