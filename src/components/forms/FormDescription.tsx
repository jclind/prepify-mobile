import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextMedium from '../text/TextMedium'
import formStyles from '../../config/formStyles'

type FormDescriptionProps = {
  children: string
  style?: any
}

export default function FormDescription({
  children,
  style,
}: FormDescriptionProps) {
  console.log(children)
  return (
    <TextMedium style={[formStyles.description, style]}>{children}</TextMedium>
  )
}

const styles = StyleSheet.create({})
