import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import React from 'react'
import { Formik } from 'formik'

import Screen from '../components/layout/Screen'
import TextLarge from '../components/TextLarge'
import colors from '../config/colors'
import AppTextInput from '../components/AppTextInput'
import SubmitButton from '../components/forms/SubmitButton'
import FormField from '../components/forms/FormField'
import defaultStyles from '../config/defaultStyles'
import TextSmall from '../components/TextSmall'

interface RegisterFormValues {
  username: string
  email: string
  password: string
}

export default function Register() {
  const initialValues: RegisterFormValues = {
    username: '',
    email: '',
    password: '',
  }

  return (
    <Screen style={styles.container}>
      <TextLarge style={styles.title} textColor={colors.primary}>
        Sign Up
      </TextLarge>
      <Formik
        initialValues={initialValues}
        onSubmit={() => console.log('form submitted')}
      >
        {() => (
          <KeyboardAvoidingView behavior='padding' style={styles.form}>
            <FormField name='username' placeholder='Username' />
            <FormField
              name='email'
              placeholder='Email'
              textContentType='emailAddress'
            />
            <FormField name='password' placeholder='Password' secureTextEntry />
            <SubmitButton title='Create an Account' style={styles.submitBtn} />
            <TouchableOpacity style={styles.forgotPassBtn}>
              <TextSmall textColor={colors.secondaryText}>
                Forgot Password?
              </TextSmall>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    position: 'absolute',
    top: 50,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  submitBtn: {
    marginTop: 15,
  },
  forgotPassBtn: {
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 15,
    padding: 5,
  },
})
