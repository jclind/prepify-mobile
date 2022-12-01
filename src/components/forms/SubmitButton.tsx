import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'
import Button from '../Button'

interface SubmitButtonProps {
  title: string
  style?: any
  loading?: boolean
}

export default function SubmitButton({
  title,
  style,
  loading,
}: SubmitButtonProps) {
  const { handleSubmit } = useFormikContext()

  return (
    <Button
      title={title}
      onPress={handleSubmit}
      style={style}
      loading={loading}
    />
  )
}
