import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as yup from 'yup'

import Screen from '../../components/layout/Screen'
import formStyles from '../../config/formStyles'
import TextLarge from '../../components/text/TextLarge'
import styleVars from '../../config/styleVars'
import Form from '../../components/forms/Form'
import FormField from '../../components/forms/FormField'
import SubmitButton from '../../components/forms/SubmitButton'
import SecondarySubmitButton from '../../components/forms/SecondarySubmitButton'
import TextMedium from '../../components/text/TextMedium'
import FormTitle from '../../components/forms/FormTitle'
import FormDescription from '../../components/forms/FormDescription'

interface LoginFormValues {
  [key: string]: string
  email: string
}

const initialValues: LoginFormValues = {
  email: '',
}

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label('Email'),
})

export default function ForgotPassword() {
  return (
    <Screen style={[formStyles.container, styles.container]}>
      <View style={formStyles.titleContainer}>
        <FormTitle>Forgot Password?</FormTitle>
        <FormDescription>
          Not a problem, we'll send you an email with instructions to change
          your password.
        </FormDescription>
      </View>
      <Form
        initialValues={initialValues}
        onSubmit={() => console.log('form submitted')}
        validationSchema={validationSchema}
        style={[formStyles.form, styles.form]}
      >
        <FormField
          autoCapitalize='none'
          autoCorrect={false}
          name='email'
          placeholder='Email'
          textContentType='emailAddress'
          keyboardType='email-address'
        />

        <SubmitButton title='Submit' style={formStyles.submitBtn} />
        {/* <SecondarySubmitButton text={'Back to login'} /> */}
      </Form>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  form: {
    marginTop: 160,
  },
})
