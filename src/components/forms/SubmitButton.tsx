import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'

import Button from '../Button'

interface SubmitButtonProps {
  title: string
  style?: any
}

export default function SubmitButton({ title, style }: SubmitButtonProps) {
  const { handleSubmit } = useFormikContext()

  return <Button title={title} onPress={handleSubmit} style={style} />
}
