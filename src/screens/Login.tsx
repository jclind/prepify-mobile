import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useRef } from 'react'
import { Formik, FormikErrors } from 'formik'
import * as yup from 'yup'

import Screen from '../components/layout/Screen'
import TextLarge from '../components/TextLarge'
import styleVars from '../config/styleVars'
import FormField from '../components/forms/FormField'
import SubmitButton from '../components/forms/SubmitButton'
import TextSmall from '../components/TextSmall'
import Divider from '../components/Divider'
import ApiSignupButton from '../components/forms/ApiSignupButton'
import formStyles from '../config/formStyles'
import Form from '../components/forms/Form'

interface LoginFormValues {
  [key: string]: string
  email: string
  password: string
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
}

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(4).label('Password'),
})

export default function Login() {
  const passwordRef = useRef<TextInput>(null)
  return (
    <Screen style={formStyles.container}>
      <TextLarge style={formStyles.title} textColor={styleVars.primary}>
        Login
      </TextLarge>
      <Form
        initialValues={initialValues}
        onSubmit={() => console.log('form submitted')}
        validationSchema={validationSchema}
        style={formStyles.form}
      >
        <FormField
          autoCapitalize='none'
          autoCorrect={false}
          name='email'
          placeholder='Email'
          textContentType='emailAddress'
          keyboardType='email-address'
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <FormField
          autoCapitalize='none'
          autoCorrect={false}
          name='password'
          placeholder='Password'
          inputRef={passwordRef}
          secureTextEntry
        />
        <SubmitButton title='Login' style={formStyles.submitBtn} />
        <TouchableOpacity style={formStyles.forgotPassBtn}>
          <TextSmall textColor={styleVars.secondaryText}>
            Forgot Password?
          </TextSmall>
        </TouchableOpacity>
      </Form>
      <Divider text='or' />
      <View style={formStyles.apiBtns}>
        <ApiSignupButton iconName={'google'} text={'Continue with Google'} />
        <ApiSignupButton iconName={'apple'} text={'Continue with Apple'} />
      </View>
    </Screen>
  )
}
