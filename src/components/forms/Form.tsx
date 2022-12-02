import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'

interface StringMap {
  [key: string]: string
}

type FormProps = {
  initialValues: StringMap
  validationSchema: any
  onSubmit: ({ email, password }: { email: string; password: string }) => void
  style?: any
  children: React.ReactNode
}

export default function Form({
  initialValues,
  validationSchema,
  onSubmit,
  style,
  children,
}: FormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <View style={style}>{children}</View>}
    </Formik>
  )
}

const styles = StyleSheet.create({})
