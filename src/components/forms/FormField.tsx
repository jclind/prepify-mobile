import { StyleSheet, View, TextInputProps, TextInput } from 'react-native'
import { useFormikContext } from 'formik'
import React, { useEffect } from 'react'

import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'

type FormFieldProps = TextInputProps & {
  name: string
  inputRef?: React.RefObject<TextInput> | null
  onSubmitEditing?: () => void
}

export default function FormField({
  name,
  onSubmitEditing,
  ...otherProps
}: FormFieldProps) {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext()

  // console.log(touched, touched[name], errors, errors[name])

  const isErrorVisible = touched[name] ?? false
  const error = errors[name] ?? ''

  return (
    <View style={styles.container}>
      <ErrorMessage visible={isErrorVisible} error={error} />
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        onSubmitEditing={onSubmitEditing}
        value={values[name]}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
})
