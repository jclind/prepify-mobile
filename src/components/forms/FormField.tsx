import { useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import AppTextInput from '../AppTextInput'

interface FormFieldProps {
  name: string
  placeholder?: string
  textContentType?: string
  secureTextEntry?: boolean
  autofill?: boolean
}

export default function FormField({
  name,
  placeholder,
  textContentType,
  secureTextEntry,
  autofill,
}: FormFieldProps) {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext()

  return (
    <>
      <AppTextInput
        value={values[name]}
        onChangeText={handleChange(name)}
        onSubmitEditing={() => console.log('done')}
        placeholder={placeholder}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        autofill={autofill}
      />
    </>
  )
}
