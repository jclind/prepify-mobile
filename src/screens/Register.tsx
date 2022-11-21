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
import styleVars from '../config/styleVars'
import AppTextInput from '../components/AppTextInput'
import SubmitButton from '../components/forms/SubmitButton'
import FormField from '../components/forms/FormField'
import defaultStyles from '../config/defaultStyles'
import TextSmall from '../components/TextSmall'
import * as yup from 'yup'
import Divider from '../components/Divider'
import ApiSignupButton from '../components/forms/ApiSignupButton'

interface RegisterFormValues {
  username: string
  email: string
  password: string
}

const initialValues: RegisterFormValues = {
  username: '',
  email: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required().label('Username'),
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(4).label('Password'),
})

export default function Register() {
  return (
    <Screen style={styles.container}>
      <TextLarge style={styles.title} textColor={styleVars.primary}>
        Create Account
      </TextLarge>
      <Formik
        initialValues={initialValues}
        onSubmit={() => console.log('form submitted')}
        validationSchema={validationSchema}
      >
        {() => (
          <KeyboardAvoidingView behavior='padding' style={styles.form}>
            <FormField
              autoCapitalize='none'
              autoCorrect={false}
              name='username'
              placeholder='Username'
            />
            <FormField
              autoCapitalize='none'
              autoCorrect={false}
              name='email'
              placeholder='Email'
              textContentType='emailAddress'
              keyboardType='email-address'
            />
            <FormField
              autoCapitalize='none'
              autoCorrect={false}
              name='password'
              placeholder='Password'
              secureTextEntry
            />
            <SubmitButton title='Create an Account' style={styles.submitBtn} />
            <TouchableOpacity style={styles.forgotPassBtn}>
              <TextSmall textColor={styleVars.secondaryText}>
                Forgot Password?
              </TextSmall>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </Formik>
      <Divider text='or' />
      <View style={styles.apiBtns}>
        <ApiSignupButton iconName={'google'} text={'Continue with Google'} />
        <ApiSignupButton iconName={'apple'} text={'Continue with Apple'} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  title: {
    position: 'absolute',
    top: 30,
  },
  form: {
    width: '100%',
    marginVertical: 20,
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
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: styleVars.inputBorderColor,
    borderRadius: 25,
  },
  apiBtns: {
    width: '100%',
    marginTop: 25,
    marginBottom: 15,
  },
})
