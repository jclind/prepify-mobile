import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import * as yup from 'yup'

import Screen from '../../components/layout/Screen'
import formStyles from '../../config/formStyles'
import sv from '../../config/sv'
import Form from '../../components/forms/Form'
import FormField from '../../components/forms/FormField'
import SubmitButton from '../../components/forms/SubmitButton'
import SecondarySubmitButton from '../../components/forms/SecondarySubmitButton'
import FormTitle from '../../components/forms/FormTitle'
import FormDescription from '../../components/forms/FormDescription'
import AuthAPI from '../../api/auth'
import ErrorMessage from '../../components/forms/ErrorMessage'
import ForgotPasswordSuccess from '../../components/forms/ForgotPasswordSuccess'

interface LoginFormValues {
  [key: string]: string
  email: string
}

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label('Email'),
})

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successEmail, setSuccessEmail] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmitForm = async ({ email }) => {
    setError('')
    setLoading(true)
    const res = await AuthAPI.forgotPassword(email)

    if (res.error) {
      setError(res.error)
      return setLoading(false)
    }

    setSuccessEmail(email)
    setSuccess(true)
    setLoading(false)
  }

  const initialValues: LoginFormValues = {
    email: successEmail,
  }

  return (
    <Screen style={[formStyles.container, styles.container]}>
      {success ? (
        <ForgotPasswordSuccess setSuccess={setSuccess} />
      ) : (
        <>
          <View style={formStyles.titleContainer}>
            <FormTitle>Forgot Password?</FormTitle>
            <FormDescription numberOfLines={3}>
              Not a problem, we'll send you an email with instructions to change
              your password.
            </FormDescription>
          </View>
          <Form
            initialValues={initialValues}
            onSubmit={handleSubmitForm}
            validationSchema={validationSchema}
            style={[formStyles.form, styles.form]}
          >
            <ErrorMessage error={error} visible={!!error} />
            <FormField
              autoCapitalize='none'
              autoCorrect={false}
              name='email'
              placeholder='Email'
              textContentType='emailAddress'
              keyboardType='email-address'
            />

            <SubmitButton
              title='Submit'
              style={formStyles.submitBtn}
              loading={loading}
            />
          </Form>
        </>
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  form: {
    marginTop: 200,
  },
})
